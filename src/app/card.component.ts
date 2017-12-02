import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormControlModel, DynamicFormService } from '@ng-dynamic-forms/core';

import { ModelService } from './app.model-service';

@Component({
  selector: 'card-comp',
  templateUrl: './card.component.html'
})
export class CardComponent implements OnChanges {
        @Input() specs: any = {};
        @Input() objType: any = {};
        @Output() cardEmitter: EventEmitter<any> = new EventEmitter<any>();
      formModel: DynamicFormControlModel[] ;
      formGroup: FormGroup;
      constructor(private formService: DynamicFormService, public http: HttpClient, public modelService : ModelService) {
    }

    ngOnChanges() {
        this.getSchemas(this.specs);
      }
      getSchemas(specs) {
          console.log(specs);
            if (specs)  {
              this.formModel = this.modelService.createFormModel(specs);
              this.formGroup = this.formService.createFormGroup(this.formModel);
              console.log(this.formGroup);
          }
      }

      saveValue(val) {
          console.log(val);
          this.cardEmitter.emit({type: 'save',
        value: val});
      }

      cancelValue(){
          this.cardEmitter.emit({type: 'cancel'});
      }
}
