module.exports = {
    id: 'insigma_roles',
    table: 'insigma_roles',
    titleField: 'rolename',
    searchFields: ['rolename'],
  fields:[
         {id:'rolename',column:'rolename',type:'text',
      label:'rolename',required:true,maxLength:256,
     inMany: true},
     {id:'loweredrolename',column:'loweredrolename',type:'text',
      label:'loweredrolename',required:true,maxLength:256,
     inMany: true},
     {id:'description',column:'description',type:'text',
      label:'description',required:false,maxLength:256,
     inMany: true}
]};

/*
{
            id: 'title', column: 'title', type: 'text', 
            label: 'Title', required: true,
            maxLength: 255,
            inMany: true
        },
*/