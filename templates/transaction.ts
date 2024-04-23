import moment from "moment";
import "moment/locale/es";
import { ITransaction } from "DMH/utils/types/account.types";

export const transactionTemplate = (data: ITransaction) => `
<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <style>
        * {
            margin: 0;
            padding: 0;
            font-family: Arial, Helvetica, sans-serif
        }

        .ticket {
            width: 650px;
            margin: auto;
        }

        header {
            background: #C1FD35;
            height: 70px;
        }

        header h1 {
            line-height: 65px;
            text-align: center;
        }

        header span {
            color: white;
            background-color: black;
            padding: 3px;
        }

        .body-ticket {
            background-color: black;
            padding: 30px
        }

        .label {
            color: rgba(0, 0, 0, 0.5);
            font-size: 18px;
        }

        .amount,
        .description {
            font-weight: 700;
            font-size: 23px;
            margin: 5px 0 10px
        }

        hr {
            margin: 10px 0
        }
    </style>
</head>

<body>
    <section class="ticket">
        <header>
            <h1>DIGITAL <span>MONEY HOUSE</span></h1>
        </header>
        <div class="body-ticket">
            ${
              data.type === "Transaction" &&
              '<h2 style="color: #C1FD35">Comprobante de pago</h2>'
            }
            ${
              data.type === "Transfer" &&
              '<h2 style="color: #C1FD35">Comprobante de transferencia</h2>'
            }
            ${
              data.type === "Deposit" &&
              '<h2 style="color: #C1FD35">Comprobante de depósito</h2>'
            }
            <p style="color: white; margin: 10px 0">${`${moment(data?.dated)
              .locale("es")
              .format("LL")} a las ${moment(data?.dated)
              .locale("es")
              .format("LT")}hs.`}</p>
            <div class="detail" style="background-color: white; border-radius: 10px; padding: 10px;">
            ${data.type === "Transaction" ? '<p class="label">Pago</p>' : ""}
            ${
              data.type === "Transfer"
                ? '<p class="label">Transferencia</p>'
                : ""
            }
            ${data.type === "Deposit" ? '<p class="label">Depósito</p>' : ""}
                <p class="amount">$${data.amount}</p>
                <hr>
                ${
                  data.type === "Transaction"
                    ? '  <p class="label">Descripción</p>'
                    : ""
                }

                ${data.type === "Transfer" ? '<p class="label">De</p>' : ""}
                
                ${data.type === "Deposit" ? '<p class="label">De</p>' : ""}

                <p class="description">${
                  data.type === "Transaction" ? data.description : data.origin
                }</p>
            
                ${
                  data.type !== "Transaction" ? '<p class="label">Para</p>' : ""
                }
                ${
                  data.type !== "Transaction"
                    ? `<p class="description">${data.destination}</p>`
                    : ""
                }
                <hr>
                <p class="label">Número de operación</p>
                <p>${data.id}</p>
            </div>
        </div>
    </section>
</body>

</html>
`;
