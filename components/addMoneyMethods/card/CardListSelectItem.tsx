import React, { FC } from "react";
import { Typography, Badge, FormControlLabel, Radio } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { lastDigits } from "DMH/utils/cards";
import { CardListItem, CardListRow } from "DMH/shared/styled/Cards";
import { ICard } from "DMH/utils/types/card.types";
import { isExpired } from "DMH/utils/cards";

export type IProps = {
  card: ICard;
  selectCard?: boolean;
};

const CardListSelectItem: FC<IProps> = ({ card, selectCard }: IProps) => {
  const isExp = isExpired(card.expiration_date);

  return (
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
      {selectCard && (
        <FormControlLabel
          label=""
          value={`${card?.id}${card?.number_id}${card?.expiration_date}`}
          control={<Radio />}
        />
      )}
    </CardListRow>
  );
};

export default CardListSelectItem;
