import type {
  SuccessOkResponse,
  SuccessOkWithoutResultResponse,
} from 'api/store/common';
import { axiosClient } from 'api/apiClient';
import { getApiUrl } from 'api/store/common';

interface SearchParams {
  storeId: string;
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
interface GetEmployeeListParams {
  storeId: string;
}

interface DeleteMemberParams {
  storeId: string;
  memberId: number;
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
interface GetRequestInformationParams {
  storeId: string;
}

interface DeleteRequestInformationParams {
  storeId: string;
  customid: number;
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
  storeCustomReservationFieldList: StoreCustomReservationField[];
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
  const url = getApiUrl(
    `/stores/admins/member-registration/${params.storeId}/search`,
  );
  const response = await axiosClient.get(url, {
    params: { email: params.email },
  });
  return response.data;
};

export const EmployeeRegistration = async (
  params: MemberRegistrationParams,
): Promise<SuccessOkWithoutResultResponse> => {
  const url = getApiUrl(`/stores/admins/member-registration/${params.storeId}`);
  const response = await axiosClient.post(url, { params });
  return response.data;
};

export const getEmployeeList = async (
  params: GetEmployeeListParams,
): Promise<SuccessOkResponse<EmployeeListResponse>> => {
  const url = getApiUrl(`/stores/admins/member-registration/${params.storeId}`);
  const response = await axiosClient.get(url, {
    params,
  });
  return response.data;
};

export const deleteMember = async (
  params: DeleteMemberParams,
): Promise<SuccessOkResponse<any>> => {
  const url = getApiUrl(
    `/stores/admins/member-registration/${params.storeId}?member-id=${params.memberId}`,
  );
  const response = await axiosClient.delete(url);
  return response.data;
};

export const modifyPermission = async (
  params: ModifyPermissionpParams,
): Promise<SuccessOkResponse<any>> => {
  const url = getApiUrl(`/stores/admins/member-registration/${params.storeId}`);
  const response = await axiosClient.patch(url, params);
  return response.data;
};

export const requestInformation = async (
  Params: RequestInformationParams,
): Promise<SuccessOkWithoutResultResponse> => {
  const url = getApiUrl(
    `/stores/admins/custom-reservation-field/${Params.storeId}`,
  );
  const { storeId, data } = Params;

  const response = await axiosClient.post(url, data);
  return response.data;
};

export const getRequestInformation = async (
  Params: GetRequestInformationParams,
): Promise<SuccessOkResponse<StoreCustomReservationResponse>> => {
  const url = getApiUrl(
    `/stores/admins/custom-reservation-field/${Params.storeId}`,
  );
  const response = await axiosClient.get(url);
  return response.data;
};

export const deleteRequestInformation = async (
  Params: DeleteRequestInformationParams,
): Promise<SuccessOkWithoutResultResponse> => {
  const url = getApiUrl(
    `/stores/admins/custom-reservation-field/${Params.storeId}?custom-id=${Params.customid}`,
  );
  const response = await axiosClient.delete(url);
  return response.data;
};

export const patchRequestInformation = async (
  Params: PatchRequestInformationParams,
): Promise<SuccessOkWithoutResultResponse> => {
  const url = getApiUrl(
    `/stores/admins/custom-reservation-field/${Params.storeId}?custom-id=${Params.customid}`,
  );
  const { storeId, data } = Params;

  const response = await axiosClient.patch(url, data);
  return response.data;
};
