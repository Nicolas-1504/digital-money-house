import React, { FC, useState, useEffect } from "react";
import { Typography, Badge, Modal, Button, Box } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { lastDigits } from "DMH/utils/cards";
import {
  CardListItem,
  CardListRow,
  DeleteButton,
  ModalBox,
  ModalDeleteButton,
  ModalCancelButton,
} from "DMH/shared/styled/Cards";
import { deleteCard } from "DMH/services/card.service";
import { ICard } from "DMH/utils/types/card.types";
import { isExpired } from "DMH/utils/cards";

export type IProps = {
  card: ICard;
  cardDelete: boolean;
  setCardDelete: (bool: boolean) => void;
};

const ListItemCard: FC<IProps> = ({
  card,
  cardDelete,
  setCardDelete,
}: IProps) => {
  const isExp = isExpired(card.expiration_date);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (id: number) => {
    await deleteCard(id);
    setCardDelete(!cardDelete);
    handleClose();
  };

  return (
    <>
      <CardListRow title={`Vencimiento ${card.expiration_date}`}>
        <CardListItem>
          <CircleIcon sx={{ color: isExp ? "#FF5050" : "primary.main" }} />
          <Typography>{`Terminada en ${lastDigits(
            card.number_id,
            4
          )}`}</Typography>
          {isExp && (
            <Badge
              badgeContent={`Vencida`}
              color="error"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            />
          )}
        </CardListItem>
        <DeleteButton onClick={handleOpen}>Eliminar</DeleteButton>
      </CardListRow>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <ModalBox>
          <h2 id="child-modal-title">Eliminar tarjeta</h2>
          <p id="child-modal-description" style={{ fontWeight: "700" }}>
            {`¿Estás seguro que querés eliminar la tarjeta N° ${card.number_id}?`}
          </p>
          <p id="child-modal-description">
            {`Vencimiento ${card.expiration_date} (${
              isExp ? "VENCIDA" : "VIGENTE"
            })`}
          </p>
          <ModalDeleteButton onClick={() => handleDelete(card.id)}>
            Eliminar
          </ModalDeleteButton>
          <ModalCancelButton onClick={handleClose}>Cancelar</ModalCancelButton>
        </ModalBox>
      </Modal>
    </>
  );
};

export default ListItemCard;
