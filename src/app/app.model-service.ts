import {
    DynamicFormControlModel,
    DynamicCheckboxModel,
    DynamicInputModel,
    DynamicRadioGroupModel, DynamicSelectModel
} from '@ng-dynamic-forms/core';

import { Injectable } from '@angular/core';

@Injectable()
export class ModelService {

    constructor() { }

    createFormModel(specs) {
        let fields = specs['fields'];
        let formModel: DynamicFormControlModel[] = [];
        if (Array.isArray(fields)) {
            fields.forEach(element => {
                switch (element['input_type']) {
                    case 'TEXTBOX':
                    formModel.push(
                        new DynamicInputModel({
                            id: element['key'],
                            max: element['max'],
                            autoFocus: element['autoFocus'],
                            required: element['required'],
                            maxLength: element['maxLength'],
                            placeholder: element['key'],
                            label: element['key']
                        })
                    );
                    break;
                    case 'DROPDOWN':
                    let doption = [];
                    if(element['options']['values'] && element['options']['values'].length > 0) {
                        element['options']['values'].forEach(elem => {
                            let obj = {};
                            obj['value'] = elem;
                            obj['label'] = elem;
                            doption.push(obj);
                        });
                    }
                    formModel.push(
                        new DynamicSelectModel({
                            id: element['key'],
                            required: element['required'],
                            placeholder: element['key'],
                            options: doption,
                            multiple: element['multiple'],
                            label: element['key']
                            
                        })
                    );
                    break;
                    case 'RADIO':
                    let roption = [];
                    if(element['options']['values'] && element['options']['values'].length > 0) {
                        element['options']['values'].forEach(elem => {
                            let obj = {};
                            obj['value'] = elem;
                            obj['label'] = elem;
                            roption.push(obj);
                        });
                    }
                    formModel.push(
                        new DynamicRadioGroupModel({
                            id: element['key'],
                            required: element['required'],
                            options: roption,
                            label: element['key']
                            
                        })
                    );
                    break;
                    case 'CHECKBOX':
                    let coption = [];
                    if(element['options']['values'] && element['options']['values'].length > 0) {
                        element['options']['values'].forEach(elem => {
                            let obj = {};
                            obj['value'] = elem;
                            obj['label'] = elem;
                            coption.push(obj);
                        });
                    }
                    formModel.push(
                        new DynamicCheckboxModel({
                            id: element['key'],
                            required: element['required'],
                            value: element['key'],
                            label:element['key'],
                            labelPosition: element['position']
                        })
                    );
                    break;
                    case 'UPLOAD':
                    formModel.push(
                        new DynamicInputModel({
                            id: element['key'],
                            max: element['max'],
                            autoFocus: element['autoFocus'],
                            required: element['required'],
                            maxLength: element['maxLength'],
                            placeholder: element['key'],
                            inputType: 'file',
                            label: element['key'],
                            accept: element['file_types']
                        })
                    );
                }
            });
            return formModel;
        }
    }
}

export const SERVICES = [ ModelService];
