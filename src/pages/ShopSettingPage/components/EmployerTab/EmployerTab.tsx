import { notification } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { EmployeeResponse, SearchListResponse } from 'api/store/store';
import type { ChangeEvent } from 'react';
import type React from 'react';
import {
  deleteMember,
  getEmployeeList,
  getSeachList,
  modifyPermission,
} from 'api/store/store';
import { PATH } from 'common/utils/constants';
import { CustomToastContainer } from 'components/CustomToastContainer';
import { Label } from 'components/Label';
import {
  CheckCircleIcon,
  EmployerTabWrapper,
  HelperCircle,
  HelperText,
  HelperTextWrapper,
  InputWrapper,
  LabelWrapper,
  NoResults,
  SearchButton,
  SearchIcon,
  StaffListWrapper,
  StyledInput,
} from 'pages/ShopSettingPage/components/EmployerTab/EmployerTab.styled';
import { StaffListItem } from 'pages/ShopSettingPage/components/EmployerTab/StaffListItem';
import { StaffRegistration } from 'pages/ShopSettingPage/components/EmployerTab/StaffRegistration';

export const EmployerTab: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [searchResult, setSearchResult] = useState<SearchListResponse | null>(
    null,
  );
  const [searched, setSearched] = useState(false);
  const [employeeList, setEmployeeList] = useState<EmployeeResponse[]>([]);
  const navigate = useNavigate();
  const storeId = localStorage.getItem('storeId') || '';

  const handleSearch = async () => {
    if (email) {
      try {
        const resData = await getSeachList({ email });
        setSearched(true);
        setSearchResult(resData.result);
      } catch (error) {
        console.error(error);
        if (error) {
          setSearched(true);
          setSearchResult(null);
        }
      }
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const fetchEmployeeList = async () => {
    if (storeId) {
      try {
        const response = await getEmployeeList({ storeId });
        if (response.isSuccess) {
          const parsedEmployeeList =
            response.result.storeMemberResponseList.map((employee) => ({
              ...employee,
              permissions: JSON.parse(employee.permissionByMenu), // JSON 파싱
            }));
          setEmployeeList(parsedEmployeeList);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchEmployeeList();
  }, [storeId]);

  const handleDeleteMember = async (employeeId: number) => {
    if (!storeId) {
      console.error('storeId값 없음');
      return;
    }
    try {
      await deleteMember({ storeId, memberId: employeeId });
      const updatedEmployeeList = employeeList.filter(
        (employee) => employee.id !== employeeId,
      );
      setEmployeeList(updatedEmployeeList);
      navigate(`/${PATH.setting}/1`);
    } catch (error) {
      console.error(error);
    }
  };
  const modifyPermissionClick = async (
    employeeId: number,
    newPermissions: boolean[],
  ) => {
    try {
      if (!storeId) {
        console.error('storeId값 없음');
        return;
      }

      const permissionByMenu = {
        storeStatus: newPermissions[0],
        seatSetting: newPermissions[1],
        storeStatistics: newPermissions[2],
        storeSetting: newPermissions[3],
      };

      const params = {
        storeId,
        id: employeeId,
        permissionByMenu,
      };
      await modifyPermission(params);
      toast.success('변경사항이 성공적으로 저장되었습니다.');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <EmployerTabWrapper>
        <LabelWrapper>
          <Label label='직원 등록' />
          <HelperTextWrapper>
            <HelperCircle />
            <HelperText>
              직원을 등록하고 직원의 권한을 설정할 수 있어요.
            </HelperText>
          </HelperTextWrapper>
        </LabelWrapper>
        <InputWrapper>
          <SearchIcon />
          <StyledInput
            placeholder='직원의 이메일을 검색해 주세요.'
            onChange={handleChange}
            value={email}
          />
          <SearchButton onClick={handleSearch}>검색</SearchButton>
        </InputWrapper>
        {searchResult ? (
          <StaffRegistration
            email={searchResult.email}
            name={searchResult.name}
            storeId={storeId}
            onEmployeeAdded={fetchEmployeeList}
          />
        ) : searched ? (
          <NoResults>등록되지 않은 사용자입니다.</NoResults>
        ) : null}
      </EmployerTabWrapper>
      <StaffListWrapper>
        <Label label='직원 목록' />
        {employeeList.map((employee) =>
          employee.permissions ? (
            <StaffListItem
              key={employee.id}
              name={employee.name}
              email={employee.email}
              permissions={employee.permissions}
              staffDeleteClick={() => {
                handleDeleteMember(employee.id);
              }}
              modifyPermissionClick={(newPermissions) => {
                modifyPermissionClick(employee.id, newPermissions);
              }}
            />
          ) : null,
        )}
        <CustomToastContainer />
      </StaffListWrapper>
    </>
  );
};
