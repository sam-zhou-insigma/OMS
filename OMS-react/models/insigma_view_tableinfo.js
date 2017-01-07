
module.exports = {
  id: 'insigma_view_tableinfo',
  label: 'insigma_view_tableinfo',
  name: 'insigma_view_tableinfo',
  namePlural: 'insigma_view_tableinfos',
  icon: 'todo.gif',
  titleField: 'tablename',

	fields:[
    {
      id: 'tablename',
      label: 'tablename',
      type: 'text',
      width: 64,
      required: true,
      inMany: true
    },
    {
      id: 'fieldname',
      label: 'fieldname',
      type: 'text',
      width: 64,
      required: true,
      inMany: true
    },{
      id: 'typename',
      label: 'typename',
      type: 'text',
      width: 20,
      required: true,
      inMany: true
    },{
      id: 'length',
      label: 'length',
      type: 'integer',
      width: 20,
      required: true,
      inMany: true
    },{
      id: 'notnull',
      label: 'notnull',
      type: 'boolean',
      width: 20,
      required: true,
      inMany: true
    }
    ]
}

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

