import type {
  SuccessOkResponse,
  SuccessOkWithoutResultResponse,
} from 'api/store/common';
import { axiosClient } from 'api/apiClient';
import { getApiUrl } from 'api/store/common';

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
  const url = getApiUrl(`/users/search?email=${params.email}`);
  const response = await axiosClient.get(url);
  return response.data;
};

export const EmployeeRegistration = async (
  params: MemberRegistrationParams,
): Promise<SuccessOkWithoutResultResponse> => {
  const { storeId, ...restParams } = params;
  const url = getApiUrl(`/stores/admins/member-registration/${storeId}`);
  const response = await axiosClient.post(url, restParams);
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
  const { storeId, ...restParams } = params;
  const url = getApiUrl(`/stores/admins/member-registration/${storeId}`);
  const response = await axiosClient.patch(url, restParams);
  return response.data;
};
