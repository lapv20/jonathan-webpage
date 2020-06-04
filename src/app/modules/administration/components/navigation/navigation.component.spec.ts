import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '@services/user/user.service';
import { DebugElement } from '@angular/core';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let debugElement: DebugElement;
  let userService: UserService;
  let logoutSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NavigationComponent],
      providers: [ UserService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    userService = debugElement.injector.get(UserService);
    logoutSpy = spyOn(userService, 'logout');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call UserService on logout', () => {
    component.logout();
    expect(logoutSpy).toHaveBeenCalled();
  });

});
