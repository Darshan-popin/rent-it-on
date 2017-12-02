import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DynamicFormService } from '@ng-dynamic-forms/core';

import { ModelService } from './app.model-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
      specs:any ;
      objType: any;
      schema: any;
      values:any = {};
      isAdmin: boolean = false;
      validJson: boolean = false;
      schemaControl : FormControl = new FormControl();
      exception;
      constructor(private formService: DynamicFormService, public http: HttpClient, public modelService : ModelService) {
        this.getSchemas();
        
      }

      checkJsonValue(){
        let data = this.schemaControl.value;
          try{
            console.log(data);
            data = JSON.parse(data);
            let name = data.name;
            let spec = data.specification;
            let fields = data.specification.fields;
            if(data.specification.fields.length > 0){
              this.validJson = true;
            }
          } catch(e ){
            this.exception = e;
            alert(this.exception);
          }
      }
      getSchemas() {
          let schemaResp = this.http.get('http://localhost:3000/object_types');
          schemaResp.subscribe((data) => {
            if (data) {
              this.schema = data;
              console.log(data);
              this.getRelatedData();
          }
        });
      }

      getRelatedData(){
        if(this.schema){
          this.schema.forEach(element => {
            let resp = this.http.post('http://localhost:3000/object_data_values/' +  element['id']  +
            '/get_object_datum_values', element['name']);
            resp.subscribe(data => {
              if(data){
                this.values[element['name']] = data;
              }
            });
          });
        }
      }

      setValuesTo(obj){
        this.specs = obj['specification'];
        this.objType = obj['name'];
      }

      cardEvent(eve){
        console.log(eve);
        if(eve['type'] === 'save'){
          if (!this.values[this.objType]  ){
            this.values[this.objType] = [];
          }
          this.values[this.objType].push( eve['value']);
          let obj = {};
          obj['name']= this.objType;
          obj['value']= eve['value'];
          let rep = this.http.post('http://localhost:3000/object_data_values', obj);
          rep.subscribe(data => {
            console.log(data, 'saved');
          });
        }
        this.specs = null;
        this.objType  =null;
      }

      navToNormal(){
        this.isAdmin = false;
        this.schemaControl.setValue('');
        this.validJson = false;
      }

      saveSchema(){
        if(this.validJson){
          let rep = this.http.post('http://localhost:3000/object_type', this.schemaControl.value);
          rep.subscribe(data => {
            console.log(data, 'saved Schema');
          })
        }
      }
}
