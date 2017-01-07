module.exports = {
  id: 'insigmauser',
  label: 'insigmauser',
  name: 'insigmauser',
  namePlural: 'insigmausers',
  icon: 'todo.gif',
  titleField: 'Name',

	fields:[
    {
      id: 'Name',
      label: 'Name',
      type: 'text',
      width: 100,
      required: true,
      inMany: true
    },
    {
      id: 'Pwd',
      label: 'Pwd',
      type: 'text',
      width: 100
    }
    ]
}