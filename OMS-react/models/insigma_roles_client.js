module.exports = {
    id: 'insigma_roles',
    label: 'insigma_roles',
    name: 'insigma_roles',
    namePlural: 'insigma_roles',
    icon: 'comics.png',
    titleField: 'rolename',
    searchFields: ['rolename'],
  fields:[
    {id:'rolename',type:'text',label:'rolename',
    required:true,width:256,
    inMany: true//,defaultValue: 4
    },
    {id:'loweredrolename',type:'text',label:'loweredrolename',
    required:true,width:256,
    inMany: true//,defaultValue: 4
    },
    {id:'description',type:'text',label:'description',
    required:false,width:256,
    inMany: true//,defaultValue: 4
    }
]};