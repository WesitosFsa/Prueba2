import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DogsListPage } from './dogs-list.page';

describe('DogsListPage', () => {
  let component: DogsListPage;
  let fixture: ComponentFixture<DogsListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DogsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
