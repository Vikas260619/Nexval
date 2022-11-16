export interface HeaderPanel {
  isheaderVisible: boolean;
  isLogoVisible: boolean;
  isMenuVisible: boolean;
  isSearchVisible: boolean;
  isActionButtonsVisible: boolean;
  orgName: boolean;
}

export interface SidePanel {
  isSidePanelVisible: boolean;
}

export interface SignupOne {
  firstName: string | null;
  lastName: string | null;
  mobileNumber: string | null;
  dialCode: string | null;
  password: string | null;
}
