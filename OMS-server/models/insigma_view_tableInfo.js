module.exports = {
    id: 'insigma_view_tableinfo',
    table: 'insigma_view_tableinfo',
    titleField: 'tableName',
    searchFields: ['tableName', 'fieldName'],
    fields: [
        {
            id: 'tableName', column: 'tablename', type: 'text', 
            label: 'tableName', required: true,
            maxLength: 255,
            inMany: true
        },
          {
            id: 'fieldName', column: 'fieldname', type: 'text', 
            label: 'fieldName', required: true,
            maxLength: 255,
            inMany: true
        },
        {
            id: 'typeName', column: 'typename', type: 'text', 
            label: 'typeName', required: true,
            maxLength: 255,
            inMany: true
        },
        {
            id: 'length', column: 'length', type: 'integer', 
            label: 'length', 
            maxLength: 255
        },
        {
            id: 'notNull', column: 'notnull', type: 'boolean', 
            label: 'notNull', 
            maxLength: 255
        }
    ]
};

/*
Create View evol_demo.insigma_view_TableInfo
as
SELECT
row_number() over(order by c.relname asc) as id,
c.relname as tableName,
a.attnum as columnNo,
a.attname AS fieldName,
t.typname AS typeName,
case when a.attlen<0 and a.atttypmod>4 then a.atttypmod-4 else a.attlen end  AS length,
a.attnotnull AS notNull
        FROM
                pg_class c,
                pg_attribute a,
                pg_type t
        WHERE
                c.relname LIKE 'insigma_%' and c.relkind='r'
                and a.attnum > 0
                and a.attrelid = c.oid
                and a.atttypid = t.oid
        */