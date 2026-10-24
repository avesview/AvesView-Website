#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Simple CSV parser that handles quoted fields
function parseCSV(content) {
  const lines = content.trim().split('\n');
  const headers = parseCSVLine(lines[0]);
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const values = parseCSVLine(lines[i]);
    const row = {};
    headers.forEach((h, idx) => {
      row[h.trim()] = (values[idx] || '').trim();
    });
    rows.push(row);
  }
  return rows;
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

function slugify(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function categorize(title, parentAsin) {
  const t = title.toLowerCase();
  if (t.includes('rj45 connector') || t.includes('pass through') || t.includes('modular plug')) return 'rj45-connectors';
  if (t.includes('keystone')) return 'rj45-connectors';
  if (t.includes('crimping tool') || t.includes('crimper')) return 'accessories';
  if (t.includes('boot')) return 'accessories';
  if (t.includes('plenum') || t.includes('cmp')) return 'cat6-plenum';
  if (t.includes('shielded') || t.includes('sftp') || t.includes('ftp')) {
    if (t.includes('1000ft') || t.includes('bulk')) return 'cat6-shielded-bulk';
    return 'cat6-shielded';
  }
  if (t.includes('1000ft') || t.includes('1000 ft') || t.includes('bulk') || t.includes('easy pull box')) return 'cat6-bulk';
  if (t.includes('10 pack') || t.includes('(10 pack)') || t.includes('4 pack')) return 'multi-packs';
  return 'patch-cables';
}

function extractLength(title) {
  const match = title.match(/(\d+)\s*(?:ft|foot|feet)/i);
  return match ? `${match[1]}ft` : null;
}

function getBaseTitle(title, color) {
  // Remove color and length suffixes, clean up
  let base = title
    .replace(/\s*\([^)]*\)\s*/g, ' ')
    .replace(/[-–]\s*(Blue|White|Black|Green|Yellow|Red|Transparent|Gray)\s*$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Further simplify for grouping
  base = base
    .replace(/\s+\d+\s*(?:ft|foot|feet)\s*/gi, ' ')
    .replace(/\s+$/, '')
    .trim();
  
  return base;
}

// Read CSVs
const productsCSV = fs.readFileSync('/Users/agent/.openclaw/workspace/avesview_products_export.csv', 'utf8');
const warehouseCSV = fs.readFileSync('/Users/agent/.openclaw/workspace/avesview_warehouse_export.csv', 'utf8');

const products = parseCSV(productsCSV);
const warehouse = parseCSV(warehouseCSV);

// Build warehouse lookup by asin
const warehouseLookup = {};
warehouse.forEach(row => {
  warehouseLookup[row.asin] = {
    qty: parseInt(row.warehouse_qty) || 0,
    location: row.warehouse_location || ''
  };
});

// Group products by parent_asin
const groups = {};

products.forEach(p => {
  const parentAsin = p.parent_asin || p.asin;
  if (!groups[parentAsin]) {
    groups[parentAsin] = [];
  }
  groups[parentAsin].push(p);
});

// Build structured product list
const structured = [];

Object.entries(groups).forEach(([parentAsin, variants]) => {
  const first = variants[0];
  const category = categorize(first.title, parentAsin);
  const length = extractLength(first.title);
  
  // Build title: use parent's general title (strip color/variant specifics)
  let title = first.title
    .replace(/\s*\([^)]*\)\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Make a clean group title
  let groupTitle = first.title
    .replace(/\s*\((?:Blue|White|Black|Green|Yellow|Red|Transparent|Gray)[^)]*\)\s*/gi, ' ')
    .replace(/[-–]\s*(?:Blue|White|Black|Green|Yellow|Red|Transparent|Gray)\s*$/i, '')
    .replace(/,\s*(?:Blue|White|Black|Green|Yellow|Red|Transparent|Gray)\s*$/i, '')
    .replace(/\s+/g, ' ')
    .trim();

  const slug = slugify(groupTitle).substring(0, 80);

  // Build description from title
  let description = groupTitle;
  if (description.startsWith('AvesView ')) {
    description = description.substring('AvesView '.length);
  }

  const variantList = variants.map(v => {
    const wh = warehouseLookup[v.asin] || { qty: 0, location: '' };
    const price = parseFloat(v.list_price) || parseFloat(v.sale_price) || 0;
    return {
      asin: v.asin,
      sku: v.sku || v.upc || v.asin,
      color: v.color_variant || 'Standard',
      length: extractLength(v.title),
      price: price,
      image: v.image_url || '',
      inStock: wh.qty > 0,
      warehouseQty: wh.qty,
      warehouseLocation: wh.location
    };
  });

  structured.push({
    id: parentAsin,
    slug: slug,
    title: groupTitle,
    category: category,
    description: description,
    variants: variantList
  });
});

// Write output
fs.mkdirSync('/Users/agent/.openclaw/workspace/avesview-website/data', { recursive: true });
fs.writeFileSync(
  '/Users/agent/.openclaw/workspace/avesview-website/data/products.json',
  JSON.stringify(structured, null, 2)
);

console.log(`Generated ${structured.length} product groups from ${products.length} SKUs`);
structured.forEach(p => console.log(`  [${p.category}] ${p.title} (${p.variants.length} variants)`));
