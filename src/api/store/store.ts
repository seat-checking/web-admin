import type {
  SuccessOkResponse,
  SuccessOkWithoutResultResponse,
} from 'api/store/common';
import { axiosClient } from 'api/apiClient';

export type DayOfWeek = 'SUN' | 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT';

interface SearchParams {
  email: string;
}
interface MemberRegistrationParams {
  storeId: string;
  email: string;
  permissionByMenu: {
    storeStatus: boolean;
    seatSetting: boolean;
    storeStatistics: boolean;
    storeSetting: boolean;
  };
}
interface RequestInformationParams {
  storeId: string;
  data: {
    title: string;
    type: string;
    contentGuide: string[];
  };
}

interface PatchRequestInformationParams {
  storeId: string;
  customid: number;
  data: {
    title: string;
    type: string;
    contentGuide: string[];
  };
}
interface GetRequestInformationParams {
  storeId: string;
}
interface GetEmployeeListParams {
  storeId: string;
}

interface DeleteMemberParams {
  storeId: string;
  memberId: number;
}
interface DeleteRequestInformationParams {
  storeId: string;
  customid: number;
}
interface ModifyPermissionpParams {
  storeId: string;
  id: number;
  permissionByMenu: {
    storeStatus: boolean;
    seatSetting: boolean;
    storeStatistics: boolean;
    storeSetting: boolean;
  };
}
export interface OperatingTimeResponse {
  breakTimeStart: string;
  breakTimeEnd: string;
  dayOff: DayOfWeek[] | null;
  monOpenTime: string | null;
  monCloseTime: string | null;
  tueOpenTime: string | null;
  tueCloseTime: string | null;
  wedOpenTime: string | null;
  wedCloseTime: string | null;
  thuOpenTime: string | null;
  thuCloseTime: string | null;
  friOpenTime: string | null;
  friCloseTime: string | null;
  satOpenTime: string | null;
  satCloseTime: string | null;
  sunOpenTime: string | null;
  sunCloseTime: string | null;
  breakTime: string | null;
  useTimeLimit: string | null;
}

interface OperatingTimeParams {
  storeId: string;
}
export interface SearchListResponse {
  email: string;
  name: string;
}

export interface EmployeeResponse {
  id: number;
  name: string;
  email: string;
  permissionByMenu: string;
  permissions?: {
    storeStatus: boolean;
    seatSetting: boolean;
    storeStatistics: boolean;
    storeSetting: boolean;
  };
}

interface EmployeeListResponse {
  storeMemberResponseList: EmployeeResponse[];
}

export interface StoreCustomReservationField {
  id: number;
  title: string;
  type: string;
  contentGuide: string;
}

export interface StoreCustomReservationResponse {
  storeCustomUtilizationFieldList: StoreCustomReservationField[];
}

export interface ErrorResponse {
  code: string;
  errors: [];
  message: string;
  status: number;
  success: boolean;
}

export const getSeachList = async (
  params: SearchParams,
): Promise<SuccessOkResponse<SearchListResponse>> => {
  const response = await axiosClient.get(`/users/search?email=${params.email}`);
  return response.data;
};

export const EmployeeRegistration = async (
  params: MemberRegistrationParams,
): Promise<SuccessOkWithoutResultResponse> => {
  const { storeId, ...restParams } = params;
  const response = await axiosClient.post(
    `/stores/admins/member-registration/${storeId}`,
    restParams,
  );
  return response.data;
};

export const getEmployeeList = async (
  params: GetEmployeeListParams,
): Promise<SuccessOkResponse<EmployeeListResponse>> => {
  const response = await axiosClient.get(
    `/stores/admins/member-registration/${params.storeId}`,
    {
      params,
    },
  );
  return response.data;
};

export const deleteMember = async (
  params: DeleteMemberParams,
): Promise<SuccessOkWithoutResultResponse> => {
  const response = await axiosClient.delete(
    `/stores/admins/member-registration/${params.storeId}?member-id=${params.memberId}`,
  );
  return response.data;
};

export const modifyPermission = async (
  params: ModifyPermissionpParams,
): Promise<SuccessOkWithoutResultResponse> => {
  const { storeId, ...restParams } = params;
  const response = await axiosClient.patch(
    `/stores/admins/member-registration/${storeId}`,
    restParams,
  );
  return response.data;
};

export const requestInformation = async (
  Params: RequestInformationParams,
): Promise<SuccessOkWithoutResultResponse> => {
  const { data } = Params;

  const response = await axiosClient.post(
    `/stores/admins/custom-utilization-field/${Params.storeId}`,
    data,
  );
  return response.data;
};

export const getRequestInformation = async (
  Params: GetRequestInformationParams,
): Promise<SuccessOkResponse<StoreCustomReservationResponse>> => {
  const response = await axiosClient.get(
    `/stores/admins/custom-utilization-field/${Params.storeId}`,
  );
  return response.data;
};

export const deleteRequestInformation = async (
  Params: DeleteRequestInformationParams,
): Promise<SuccessOkWithoutResultResponse> => {
  const response = await axiosClient.delete(
    `/stores/admins/custom-utilization-field/${Params.storeId}?custom-id=${Params.customid}`,
  );
  return response.data;
};
export const patchRequestInformation = async (
  Params: PatchRequestInformationParams,
): Promise<SuccessOkWithoutResultResponse> => {
  const { data } = Params;
  const response = await axiosClient.patch(
    `/stores/admins/custom-utilization-field/${Params.storeId}?custom-id=${Params.customid}`,
    data,
  );
  return response.data;
};

export const getOperatingTime = async (
  params: OperatingTimeParams,
): Promise<SuccessOkResponse<OperatingTimeResponse>> => {
  const response = await axiosClient.get(
    `/stores/admins/operating-time/${params.storeId}`,
  );
  return response.data;
};

export const patchOperatingTime = async (
  params: OperatingTimeParams,
): Promise<SuccessOkWithoutResultResponse> => {
  const { storeId, ...restOfParams } = params;

  const response = await axiosClient.patch(
    `/stores/admins/operating-time/${storeId}`,
    restOfParams,
  );

  return response.data;
};
