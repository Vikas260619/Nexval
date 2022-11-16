import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  HeaderPanel,
  SidePanel,
  SignupOne,
} from '../interfaces/store.interface';
import { userDetails } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private header: HeaderPanel;
  private sidePanel: SidePanel;

  private headerEventEmitter: BehaviorSubject<HeaderPanel> =
    new BehaviorSubject<HeaderPanel>(this.headerInit());
  private sideBarEventEmitter: BehaviorSubject<SidePanel> =
    new BehaviorSubject<SidePanel>(this.sideBarInit());

  constructor() {
    this.header = this.headerInit();
    this.sidePanel = this.sideBarInit();
    this.addMemberModal = new EventEmitter(false);
  }

  headerInit() {
    return {
      isheaderVisible: true,
      isActionButtonsVisible: true,
      isLogoVisible: true,
      isMenuVisible: true,
      isSearchVisible: true,
      orgName: true,
    };
  }

  sideBarInit() {
    return {
      isSidePanelVisible: false,
    };
  }

  //  Getter and Setter for header

  get getHeader() {
    return this.header;
  }

  set setHeader(header: HeaderPanel) {
    this.header = header;
    this.headerEventEmitter.next(this.header);
  }

  //  Getter and Setter for sidebar

  get getSidePanel() {
    return this.sidePanel;
  }

  set setSidePanel(sidePanel: SidePanel) {
    this.sidePanel = sidePanel;
    this.sideBarEventEmitter.next(this.sidePanel);
  }

  hideHeaderlogo() {
    let header = this.headerInit();
    header.isLogoVisible = false;
    this.setHeader = header;
  }

  showHeaderlogo() {
    let header = this.headerInit();
    header.isLogoVisible = true;
    this.setHeader = header;
  }

  toggleSideBar(value: boolean) {
    let sidebar = this.sideBarInit();
    sidebar.isSidePanelVisible = value;
    this.setSidePanel = sidebar;
  }

  hideHeaderMenu() {
    let header = this.headerInit();
    header.isMenuVisible = false;
    this.setHeader = header;
  }

  showHeaderMenu() {
    let header = this.headerInit();
    header.isMenuVisible = true;
    this.setHeader = header;
  }

  hideHeaderSearch() {
    let header = this.headerInit();
    header.isSearchVisible = false;
    this.setHeader = header;
  }

  hideMenuAndSearch() {
    let header = this.headerInit();
    header.isSearchVisible = false;
    header.isMenuVisible = false;
    this.setHeader = header;
  }

  showHeaderSearch() {
    let header = this.headerInit();
    header.isSearchVisible = true;
    this.setHeader = header;
  }

  headerReset() {
    this.header = this.headerInit();
  }

  sideBarRest() {
    this.sidePanel = this.sideBarInit();
  }

  hideOrgNameWithMenuLogo() {
    let header = this.headerInit();
    header.orgName = false;
    header.isLogoVisible = false;
    header.isMenuVisible = false;
    this.setHeader = header;
  }

  get getHeaderEvent() {
    return this.headerEventEmitter;
  }

  get getSidebarEvent() {
    return this.sideBarEventEmitter;
  }

  /**
   * Signup storage management
   */

  getSignupFormOneData() {
    return localStorage.getItem('signup-one');
  }

  setSignupFormOneData(signup: SignupOne) {
    localStorage.setItem('signup-one', JSON.stringify(signup));
  }

  removeSignupFormOneData() {
    localStorage.removeItem('signup-one');
  }

  //  Modals events

  //  Member modal event handler
  private addMemberModal: EventEmitter<boolean>;
  get memberModalEventEmitter(): EventEmitter<boolean> {
    return this.addMemberModal;
  }

  logout() {
    localStorage.clear();
  }

  getOrgIdFromLocal() {
    let uDString: string | null = localStorage.getItem('userDetails');
    if (uDString) {
      let uDetail: userDetails = JSON.parse(uDString);
      return uDetail.orgid;
    }

    return 'fxb7Nf+LFSZUA8q4HisWEg==';
  }

  getUserIdFromLocal() {
    let uDString: string | null = localStorage.getItem('userDetails');
    if (uDString) {
      let uDetail: userDetails = JSON.parse(uDString);
      return uDetail.id;
    }

    return '';
  }

  getEmailFromLocal() {
    let eString: string | null = localStorage.getItem('signup-one');
    if (eString) {
      let uDetail: userDetails = JSON.parse(eString);
      return uDetail.email;
    }
    return '';
  }
  getPassFromLocal() {
    let eString: string | null = localStorage.getItem('signup-one');
    if (eString) {
      let uDetail: userDetails = JSON.parse(eString);
      return uDetail.pwd;
    }
    return '';
  }

  getRegionDefaultId() {
    return '4/yA4JUCYIwuUhUftWRDVg==';
  }
  getTeamFromLocal() {
    return localStorage.getItem('selectedTeam');
  }

  setInvitationToken(id: string) {
    localStorage.setItem('invite-string', id);
  }
  getInvitationToken() {
    return localStorage.getItem('invite-string');
  }
  removeInvitationToken() {
    localStorage.removeItem('invite-string');
  }
  setUserEmail(email: string) {
    localStorage.setItem('user-email', email);
  }
  getUserEmail() {
    return localStorage.getItem('user-email');
  }
  setUserRole(role: string) {
    localStorage.setItem('user-role', role);
  }
  getUserRole() {
    return localStorage.getItem('user-role');
  }
}
