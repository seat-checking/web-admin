import { useCallback, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useChairCountActions } from 'pages/LayoutSettingPage/stores/chairCountStore';
import { useLayoutActions } from 'pages/LayoutSettingPage/stores/layoutStore';
import { useSelectItem } from 'pages/LayoutSettingPage/stores/selectItemStore';

/**
 * 팝오버 헤더 영역 (숫자 + 삭제 버튼)
 */
export const Header: React.FC = () => {
  const { deleteItem } = useLayoutActions();
  const { selectedId } = useSelectItem();
  const { getItem } = useLayoutActions();
  const { decreaseChairCount } = useChairCountActions();

  const selectedItem = selectedId == null ? null : getItem(selectedId);
  const selectedManageId = selectedItem?.manageId;
  const selectedItemSort = selectedItem?.sort;

  const handleDeleteItem = useCallback(() => {
    if (!selectedId) return;
    deleteItem(selectedId);
    if (selectedItemSort === 'chair') {
      decreaseChairCount();
    }
  }, [deleteItem, selectedId, decreaseChairCount, selectedItemSort]);

  const handleDeleteKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Delete') {
        handleDeleteItem();
      }
    },
    [handleDeleteItem],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleDeleteKey);
    return () => window.removeEventListener('keydown', handleDeleteKey);
  }, [handleDeleteKey]);

  return (
    <Wrap>
      {typeof selectedManageId === 'number' && (
        <ManageId>{selectedManageId}번</ManageId>
      )}
      <DeleteBtn type='button' onClick={handleDeleteItem}>
        삭제
      </DeleteBtn>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 0.8rem;
`;

const ManageId = styled.span`
  color: ${({ theme }) => theme.palette.primary.orange};
  font-size: 1.2rem;
  font-weight: 500;
  line-height: normal;
`;

const DeleteBtn = styled.button`
  margin-left: auto;
  color: ${({ theme }) => theme.palette.grey[300]};
  font-size: 1.2rem;
  font-weight: 500;
  line-height: normal;
`;
