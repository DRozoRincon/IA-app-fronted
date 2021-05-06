import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReconocimientoVisualPage } from './reconocimiento-visual.page';

describe('ReconocimientoVisualPage', () => {
  let component: ReconocimientoVisualPage;
  let fixture: ComponentFixture<ReconocimientoVisualPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReconocimientoVisualPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReconocimientoVisualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
