export interface JoinFormInputs {
  email: string;
  password: string;
  passwordChecked: string;
  nickname: string;
  name: string; // 본명 (추가)
  age: string;
  sex: string;
  consentToMarketing: boolean;
  consentToTermsOfUser: boolean;
  businessRegistrationNumber: string;
  openDate: string;
  adminName: string; // 대표자명
  storeName: string; // 가게 이름
  address: string;
  detailAddress: string;
}
