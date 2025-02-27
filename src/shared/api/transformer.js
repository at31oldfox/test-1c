module.exports = inputSchema => {
  Object.entries(inputSchema.paths).forEach(([pathKey, pathItems]) => {
    const newPathKey = replacerTag([pathKey])[0];
    Object.values(pathItems).forEach(path => {
      path.tags = replacerTag(path.tags);
    });
    if (newPathKey !== pathKey) {
      inputSchema.paths[newPathKey] = inputSchema.paths[pathKey];
      delete inputSchema.paths[pathKey];
    }
  });
  return {
    ...inputSchema,
  };
};

const names = [
  ['Catalog_Контрагенты', 'Catalog_Contractors'],
  [
    'Catalog_Контрагенты_КонтактнаяИнформация',
    'Catalog_Contractors_ContactInformation',
  ],
  ['Catalog_Контрагенты_БартерныеКлиенты', 'Catalog_Contractors_BarterClients'],
  ['Catalog_Номенклатура', 'Catalog_Nomenclature'],
  [
    'Catalog_Номенклатура_ИспользуемоеОборудование',
    'Catalog_Nomenclature_UsedEquipment',
  ],
  [
    'Catalog_Номенклатура_КонтрольКритическихОстатков',
    'Catalog_Nomenclature_CriticalStockControl',
  ],
];

const searchNames = names.map(n => n[0]);
const replaceNames = names.map(n => n[1]);

function replacerTag(tags) {
  return tags.map(name => {
    const id = searchNames.indexOf(name);
    if (id >= 0) {
      return replaceNames[id];
    }
    return name;
  });
}
