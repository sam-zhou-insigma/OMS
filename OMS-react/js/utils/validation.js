
// oms-UI-React :: utils/validation.js

// https://github.com/evoluteur/oms-ui-react
// (c) 2016 Olivier Giulieri

import _ from 'underscore'
import dico from './dico'
import { locale, i18n_validation } from '../i18n/i18n'

module.exports = {

    valRegEx: {
        email: /^[\w\.\-]+@[\w\.\-]+\.[\w\.\-]+$/,
        integer: /^[-+]?\d+$/, // /^[0-9]*/,
        decimalEN: /(\+|-)?(\d*\.\d*)?$/,
        decimalFR: /(\+|-)?(\d*\,\d*)?$/,
        //decimalDA: /(\+|-)?(\d*\,\d*)?$/,
    },

    validateField: function(f, v){
        var numberField = dico.fieldIsNumber(f);
        var ft = dico.fieldTypes

        function formatMsg(fLabel, msg, r2, r3){
            return msg.replace('{0}', fLabel)
                .replace('{1}', r2)
                .replace('{2}', r3);
        }
        function fieldLabel(f){
            return f.label || f.labelMany;
        }

        if(!f.readonly){

            // Check required and empty
            if (f.required && (v===null || v==='' || _.isUndefined(v) ||
                (numberField && isNaN(v)) ||
                (f.type===ft.lov && v==='0') ||
                (f.type===ft.list && v && !v.length) //||
                //(f.type===ft.color && v==='#000000')
            )){
                return formatMsg(f.label, i18n_validation.empty);
            } else if(!_.isUndefined(v)){

                // Check field type
                if( !(isNaN(v) && numberField)) {
                    if (v!==null && v!=='' && !_.isArray(v)){
                        switch (f.type) {
                            case ft.int:
                            case ft.email:
                                if (!this.valRegEx[f.type].test(v)) {
                                    return formatMsg(fieldLabel(f), i18n_validation[f.type]);
                                }
                                break;
                            case ft.dec:
                            case ft.money:
                                var regex = this.valRegEx[ft.dec + locale] || this.valRegEx[ft.dec + 'EN'];
                                if (!regex.test(v)){
                                    return formatMsg(fieldLabel(f), i18n_validation[f.type]);
                                }
                                break;
                            case ft.date:
                            case ft.datetime:
                            case ft.time:
                                if ((v !== '') && (!_.isDate(new Date(v)))) {
                                    return formatMsg(fieldLabel(f), i18n_validation[f.type]);
                                }
                                break;
                            case ft.json:
                                var obj;
                                if(_.isObject(v)){
                                    obj=v;
                                }else{
                                    try{
                                        obj=$.parseJSON(v);
                                    }catch(err){}
                                    if(_.isUndefined(obj)){
                                        return formatMsg(fieldLabel(f), i18n_validation[f.type]);
                                    }
                                }
                                break;
                        }
                    }
                }

                // Check regexp
                if (f.regExp !== null && !_.isUndefined(f.regExp)) {
                    var rg = new RegExp(f.regExp);
                    if (!v.match(rg)) {
                        return formatMsg(fieldLabel(f), i18n_validation.regExp, fieldLabel(f));
                    }
                }

                // Check min & max
                if (numberField) {
                    if (v !== '') {
                        if (f.max && parseFloat(v) > f.max) {
                            return formatMsg(fieldLabel(f), i18n_validation.max, f.max);
                        }
                        if (f.min && parseFloat(v) < f.min) {
                            return formatMsg(fieldLabel(f), i18n_validation.min, f.min);
                        }
                    }
                }
            }

            // Check custom validation
            if (f.fnValidate) {
                var fValid = f.fnValidate(f, v);
                if (fValid !== '') {
                    return formatMsg(fieldLabel(f), fValid);
                }
            }

            // Check minLength and maxLength
            if (_.isString(v) && !numberField) {
                var len = v.length,
                    badMax = f.maxLength?len > f.maxLength:false,
                    badMin = f.minLength?len < f.minLength:false;
                if(badMax || badMin){
                    if(f.maxLength && f.minLength){
                        return formatMsg(fieldLabel(f), i18n_validation.minMaxLength, f.minLength, f.maxLength);
                    }else if(f.maxLength){
                        return formatMsg(fieldLabel(f), i18n_validation.maxLength, f.maxLength);
                    }else{
                        return formatMsg(fieldLabel(f), i18n_validation.minLength, f.minLength);
                    }
                }
            }

        }

        return '';
    },

}
