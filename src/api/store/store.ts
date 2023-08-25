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
): Promise<SuccessOkResponse<any>> => {
  const response = await axiosClient.delete(
    `/stores/admins/member-registration/${params.storeId}?member-id=${params.memberId}`,
  );
  return response.data;
};

export const modifyPermission = async (
  params: ModifyPermissionpParams,
): Promise<SuccessOkResponse<any>> => {
  const { storeId, ...restParams } = params;
  const response = await axiosClient.patch(
    `/stores/admins/member-registration/${storeId}`,
    restParams,
  );
  return response.data;
};
