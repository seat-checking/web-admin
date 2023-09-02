/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';
import type { SuccessOkResponse } from 'api/store/common';
import type {
  StoreCustomReservationField,
  StoreCustomReservationResponse,
} from 'api/store/store';
import type React from 'react';
import {
  deleteRequestInformation,
  patchRequestInformation,
} from 'api/store/store';

import { STORAGE } from 'common/utils/constants';
import { Button } from 'components/Button';
import { CustomToastContainer } from 'components/CustomToastContainer';
import { Input } from 'components/Input';
import { Label } from 'components/Label';
import { Modal } from 'components/Modal';
import { Radio } from 'components/Radio';

import {
  EditIcon,
  FlexWrapper,
  IconWrapper,
  TitleInput,
} from 'pages/ShopSettingPage/components/ApplicationTab/components/InformationAdd.styled';
import {
  ButtonWrap,
  InputWrapper,
  LabelWrapper,
  ListContent,
  ListWrapper,
  RadioWrapper,
  TitleText,
} from 'pages/ShopSettingPage/components/ApplicationTab/components/InformationList.styled';
import { SelectInput } from 'pages/ShopSettingPage/components/ApplicationTab/components/SelectInput';
import {
  ModaMainText,
  ModaSubText,
  ModalButton,
  ModalButtonWrapper,
  ModalCancel,
  ModalContent,
  ModalHeader,
  ToggleIcon,
} from 'pages/ShopSettingPage/components/EmployerTab/StaffListItem.styled';

interface InformationListProps {
  data: SuccessOkResponse<StoreCustomReservationResponse> | null;
  fetchData: () => void; // fetchData의 실제 타입에 맞게 교체
}

export const InformationList: React.FC<InformationListProps> = ({
  data,
  fetchData,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItems, setSelectedItems] = useState<{ value: string }[]>([]);
  const [, setSelectedRadio] = useState('자유 입력');
  const [modalOpen, setModalOpen] = useState<number | null>(null);
  const [openedItems, setOpenedItems] = useState<{ [id: number]: boolean }>({});
  const [editedItems, setEditedItems] = useState<{
    [id: number]: { title?: string; contentGuide?: string };
  }>({});
  const [radioStates, setRadioStates] = useState<{ [id: number]: string }>({});

  const theme = useTheme();

  const handleItemsChange = (items: { value: string }[]) => {
    setSelectedItems(items);
  };

  const toggleItemOpen = (id: number) => {
    setOpenedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleRadioChange = (id: number, value: string) => {
    setRadioStates((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const openModal = (id: number) => {
    setModalOpen(id);
  };

  const closeModal = () => {
    setModalOpen(null);
  };

  useEffect(() => {
    if (data) {
      const initialRadioStates =
        data.result.storeCustomReservationFieldList.reduce<{
          [key: number]: string;
        }>((acc, item) => {
          acc[item.id] = item.type;
          return acc;
        }, {});
      setRadioStates(initialRadioStates);
    }
  }, [data]);

  useEffect(() => {
    if (data && data.result.storeCustomReservationFieldList.length > 0) {
      const fieldType = data.result.storeCustomReservationFieldList[0].type;
      setSelectedRadio(fieldType);
    }
  }, [data]);

  if (!data) return null;

  const handleDelete = async (customid: number) => {
    if (modalOpen !== null) {
      try {
        const storeId = localStorage.getItem(STORAGE.storeId);
        if (!storeId) {
          return;
        }

        const Params = {
          storeId,
          customid,
        };

        await deleteRequestInformation(Params);
        fetchData();
        closeModal();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSave = async (item: StoreCustomReservationField) => {
    const storeId = localStorage.getItem(STORAGE.storeId);
    if (!storeId) {
      return;
    }

    const editedTitle = editedItems[item.id]?.title || item.title;

    let editedContentGuide: string[];

    if (item.type === '자유 입력') {
      editedContentGuide = [
        editedItems[item.id]?.contentGuide || item.contentGuide,
      ];
    } else {
      editedContentGuide = selectedItems.map((i) => i.value);
    }

    const resData = {
      title: editedTitle,
      type: radioStates[item.id],
      contentGuide: editedContentGuide,
    };
    const params = {
      storeId,
      data: resData,
      customid: item.id,
    };

    try {
      await patchRequestInformation(params);
      fetchData();
      toast.success('변경사항이 성공적으로 저장되었습니다.');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <LabelWrapper>
      <Label required={false} label='요청 정보 목록' />
      {data.result.storeCustomReservationFieldList.map((item) => (
        <ListWrapper key={item.id}>
          <ListContent>
            <FlexWrapper>
              <IconWrapper>
                {openedItems[item.id] ? (
                  <>
                    <TitleInput
                      style={{ background: '#fff' }}
                      value={
                        typeof editedItems[item.id]?.title !== 'undefined'
                          ? editedItems[item.id]?.title
                          : item.title
                      }
                      placeholder='*제목을 입력해주세요'
                      onFocus={() => setIsEditing(true)}
                      onBlur={() => setIsEditing(false)}
                      focused={isEditing}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setEditedItems((prev) => ({
                          ...prev,
                          [item.id]: { ...prev[item.id], title: newValue },
                        }));
                      }}
                    />
                    {!isEditing && <EditIcon />}
                  </>
                ) : (
                  <TitleText>{item.title}</TitleText>
                )}
              </IconWrapper>
              <RadioWrapper>
                <Radio
                  label='자유 입력'
                  value='자유 입력'
                  size='small'
                  id={`option1-${item.title}`}
                  onChange={() => handleRadioChange(item.id, '자유 입력')}
                  checked={item.type === '자유 입력'}
                />
                <Radio
                  label='선택지 제공'
                  value='선택지 제공'
                  size='small'
                  id={`option2-${item.title}`}
                  onChange={() => handleRadioChange(item.id, '선택지 제공')}
                  checked={item.type === '선택지 제공'}
                />
              </RadioWrapper>
              <ToggleIcon
                onClick={() => toggleItemOpen(item.id)}
                isOpen={openedItems[item.id]}
              />
            </FlexWrapper>
            {openedItems[item.id] && (
              <InputWrapper>
                {item.type === '자유 입력' && (
                  <Input
                    defaultValue={JSON.parse(item.contentGuide)}
                    placeholder='고객에게 가이드를 작성해주세요.(ex: 사용 목적을 입력해주세요)'
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setEditedItems((prev) => ({
                        ...prev,
                        [item.id]: { ...prev[item.id], contentGuide: newValue },
                      }));
                    }}
                  />
                )}
                {item.type === '선택지 제공' && (
                  <SelectInput
                    defaultValue={JSON.parse(item.contentGuide)}
                    type='text'
                    placeholder='고객에게 가이드를 작성해주세요.(ex: 사용 목적을 입력해주세요)'
                    isActive={false}
                    onItemsChange={handleItemsChange}
                  />
                )}
                <ButtonWrap>
                  <Button
                    style={{
                      width: '26.5rem',
                      color: theme.palette.grey[400],
                      background: theme.palette.grey[100],
                      fontSize: '1.4rem',
                    }}
                    onClick={() => openModal(item.id)}
                  >
                    삭제하기
                  </Button>
                  <Button
                    style={{ width: '26.5rem', fontSize: '1.4rem' }}
                    onClick={() => handleSave(item)}
                  >
                    저장하기
                  </Button>
                </ButtonWrap>
              </InputWrapper>
            )}
          </ListContent>
          {modalOpen === item.id && (
            <Modal onClose={closeModal}>
              <ModalHeader>정보 목록 삭제</ModalHeader>
              <ModalContent>
                <ModaMainText>정말 목록을 삭제하시나요?</ModaMainText>
                <ModaSubText>삭제한 목록은 복구할 수 없어요!</ModaSubText>
              </ModalContent>
              <ModalButtonWrapper>
                <ModalCancel onClick={closeModal}>취소</ModalCancel>
                <ModalButton onClick={() => handleDelete(item.id)}>
                  삭제
                </ModalButton>
              </ModalButtonWrapper>
            </Modal>
          )}
        </ListWrapper>
      ))}
      <CustomToastContainer />
    </LabelWrapper>
  );
};
