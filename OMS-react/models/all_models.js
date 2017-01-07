import {prepModel} from '../js/utils/dico'

import todo from './todo'
import contact from './contact'
import comics from './comics'
import insigmauser from './insigmauser'
import insigma_view_tableinfo from './insigma_view_tableinfo'
import insigma_roles from './insigma_roles_client'
//import entity from './dico/entity'
//import field from './dico/field'

module.exports = {
	todo: prepModel(todo),
	contact: prepModel(contact),
	comics: prepModel(comics),
	insigmauser: prepModel(insigmauser),
	insigma_view_tableinfo:prepModel(insigma_view_tableinfo),
	insigma_roles:prepModel(insigma_roles),
	//entity: prepModel(entity),
	//field: prepModel(field)
}

