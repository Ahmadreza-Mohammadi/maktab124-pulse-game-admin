import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { products } from "../../database/products";
import { digitsEnToFa, formatPrice } from "../utils/helper";
import { TableHead } from "@mui/material";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2 }}>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <span className="text-[16px]">صفحه آخر</span>
        <LastPageIcon />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <span className="text-[16px]">صفحه قبل</span>
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <KeyboardArrowRight />
        <span className="text-[16px]">صفحه بعد</span>
      </IconButton>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        <span className="text-[16px]">صفحه اول</span>
        <FirstPageIcon />
      </IconButton>
      <span>
        {digitsEnToFa(page + 1)} از{" "}
        {digitsEnToFa(Math.ceil(count / rowsPerPage))}
      </span>
    </Box>
  );
}

function createData(
  title: string,
  price: number,
  quantity: number,
  category: string,
  creator: string,
  stock: boolean,
  rating: number,
  releaseYear: number
) {
  return {
    title,
    price,
    quantity,
    category,
    creator,
    stock,
    rating,
    releaseYear,
  };
}

const rows = products
  .map((product) =>
    createData(
      product.title,
      product.price,
      product.quantity,
      product.category,
      product.creator,
      product.stock,
      product.rating,
      product.releaseYear
    )
  )
  .sort((a, b) => (a.price < b.price ? -1 : 1));

export default function ProductsTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="product table">
        <TableHead>
          <TableRow sx={{background:"#146262"}}>
            <TableCell
              align="center"
              sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
              عنوان
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
              قیمت
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
              تعداد موجود
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
              دسته بندی
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
              سازنده
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
              وضعیت
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
              امتیاز
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
              سال انتشار
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{background:"#2ec5c5"}}>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.title}>
              <TableCell align="center">{row.title}</TableCell>
              <TableCell align="center">
                {formatPrice(row.price)} تومان
              </TableCell>
              <TableCell align="center">{digitsEnToFa(row.quantity)}</TableCell>
              <TableCell align="center">
                {row.category === "game" && "بازی"}
                {row.category === "keyboard" && "کیبورد"}
                {row.category === "mouse" && "ماوس"}
                {row.category === "headset" && "هدست"}
                {row.category === "chair" && "صندلی گیمینگ"}
              </TableCell>
              <TableCell align="center">{row.creator}</TableCell>
              <TableCell align="center">
                {row.stock ? "موجود" : "ناموجود"}
              </TableCell>
              <TableCell align="center">{digitsEnToFa(row.rating)}</TableCell>
              <TableCell align="center">
                {digitsEnToFa(row.releaseYear)}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={8} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
            
              rowsPerPageOptions={[5, 10, 15, { label: "همه", value: -1 }]}
              colSpan={6}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
