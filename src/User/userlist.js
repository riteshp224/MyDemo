import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pagination } from "../Constant/Constants";
import { ListGroup, Pagination } from "react-bootstrap";
import '@fortawesome/fontawesome-free/css/all.css';
import './userlist.css';
export default function UserList() {
    const apiUrl = process.env.REACT_APP_API_URL;

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [totalRecords, setTotalRecords] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPageRecords, setPerPageRecords] = useState(10);
    const [deleteRecordId, setDeleteRecordId] = useState(null);
    const [sortColumn, setSortColumn] = useState("createdDate");
    const [sortOrder, setSortOrder] = useState("desc");
    const [search, setSearch] = useState("");
    const [userList, setUserList] = useState([]);
    const [formData, setFormData] = useState({
        FirstName: "",
        LastName: "",
        EmailId: "",
    });

    async function fetchData() {
        
        const jwtToken = localStorage.getItem("authToken");
        try {

            const data = {
                PageNumber: currentPage,
                pageSize: perPageRecords,
                sortColumn: sortColumn,
                sortOrder: sortOrder,
                StrSearch:search
            }
            const response = await fetch(`${apiUrl}user/list`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();

                setTotalRecords(data.data[0].totalRecord);

                setUserList(data.data);

            }

        } catch (error) {

        }
    }
    useEffect(() => {
        fetchData();
    }, [search, currentPage, perPageRecords, sortColumn, sortOrder]);

    function handleSearch(e) {
        setSearch(e.target.value);
        setCurrentPage(1);
    }
    function handleSort(column) {

    }
    function handleRecordsPerPageChange(event)
    {
        const val=parseInt(event.target.value);
        setPerPageRecords(val);
        setCurrentPage(1);
        console.log(userList);
    }
    function prevPage()
    {
        if (currentPage <= Math.ceil(totalRecords / perPageRecords)) {
            setCurrentPage(currentPage - 1);
        }
    }
    function nextPage()
    {
        if (currentPage < Math.ceil(totalRecords / perPageRecords)) {
            setCurrentPage(currentPage + 1);
        }
    }
    function paginate(pageNumber) { 
        setCurrentPage(pageNumber);
    };
    function handleEditClick()
    {

    }
    function handleDeleteClick()
    {
        
    }

    return (
        <div className="container mainclasstable">
            <div className="row g-0 align-items-center justify-content-between middle_head mb-3">
                <div className="col-xl-12 col-12 d-flex align-items-center justify-content-xl-end justify-content-start gap-2">
                    <div className="input-group flex-nowrap searchbar">
                        <span className="input-group-text" id="addon-wrapping">
                            <i className="fas fa-search"></i>
                        </span>
                        <input
                            type="search"
                            className="form-control topsearch"
                            placeholder="Search User..."
                            value={search}
                            onChange={handleSearch}
                        />
                    </div>
                    <span
                        className="btn head_btn"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        title="Add User"
                    >
                        <i className="fas fa-plus"></i>
                    </span>
                </div>
            </div>
            <div className="list_view_main mx-0 mt-3">
                <div className="table-responsive text-nowrap p-0">
                    <table className="table common-table m-0">
                        <thead>
                            <tr>
                                <th scope="col" onClick={() => handleSort("FirstName")}>
                                    First Name
                                    <i className={`fas fa-sort${sortColumn === "FirstName" ? (sortOrder === "asc" ? "-up" : "-down") : ""}`}></i>
                                </th>
                                <th scope="col" onClick={() => handleSort("LastName")}>
                                    Last Name
                                    <i className={`fas fa-sort${sortColumn === "LastName" ? (sortOrder === "asc" ? "-up" : "-down") : ""}`}></i>
                                </th>
                                <th scope="col" onClick={() => handleSort("EmailId")}>
                                    Email Id
                                    <i className={`fas fa-sort${sortColumn === "EmailId" ? (sortOrder === "asc" ? "-up" : "-down") : ""}`}></i>
                                </th>
                                <th scope="col" className="text-center action-btns">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList
                                .map((data, index) => (
                                    <tr key={data.userId}>
                                        <td title={data.firstName} >
                                            {data.firstName}
                                        </td>
                                        <td title={data.lastName} >
                                            {data.lastName}
                                        </td>
                                        <td title={data.emailId} >
                                            {data.emailId}
                                        </td>
                                        <td >
                                        <span className="edit_icon_bg" onClick={() => handleEditClick(data.userId)}><button className="edit_icon"></button></span>
                                        <span className="delete_icon_bg" onClick={() => handleDeleteClick(data.userId)}><button className="delete_icon"></button></span>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="row justify-content-center">
                <b
                    className={`text-center ${userList.length === 0 ? "no-data-found" : ""
                        }`}
                >
                    {userList.length === 0 && pagination.noUserFound}
                </b>
            </div>

            {userList.length > 0 && (
                    <div className="d-flex justify-content-between align-items-center py-3 px-2 custom-pagination">
                        <div className="left-pagination">
                            <div className="input-group">
                                <select
                                    className="form-select"
                                    id="recordsPerPage"
                                    value={perPageRecords}
                                    onChange={handleRecordsPerPageChange}
                                >
                                    <option value={5}>5 {pagination.recordPerPage}</option>
                                    <option value={10}>10 {pagination.recordPerPage}</option>
                                    <option value={25}>25 {pagination.recordPerPage}</option>
                                    <option value={50}>50 {pagination.recordPerPage}</option>
                                    <option value={100}>100 {pagination.recordPerPage}</option>
                                </select>
                            </div>
                        </div>
                        <div className="right-pagination">
                            <Pagination className="float-end">
                                <Pagination.First
                                    onClick={() => paginate(1)}
                                    disabled={currentPage === 1}
                                />
                                <Pagination.Prev
                                    onClick={prevPage}
                                    disabled={currentPage === 1}
                                />
                                {Array.from(
                                    { length: Math.ceil(totalRecords / perPageRecords) },
                                    (_, i) => (
                                        <Pagination.Item
                                            key={i + 1}
                                            active={i + 1 === currentPage}
                                            onClick={() => paginate(i + 1)}
                                        >
                                            {i + 1}
                                        </Pagination.Item>
                                    )
                                )}
                                <Pagination.Next
                                    onClick={nextPage}
                                    disabled={
                                        currentPage ===
                                        Math.ceil(totalRecords / perPageRecords)
                                    }
                                    
                                />
                                <Pagination.Last
                                    onClick={() =>
                                        paginate(Math.ceil(totalRecords / perPageRecords))
                                    }
                                    disabled={
                                        currentPage ===
                                        Math.ceil(totalRecords / perPageRecords)
                                    }
                                />
                            </Pagination>
                            <span className="listofpagenumber ms-2">{pagination.showing} {userList.length} {pagination.of} {totalRecords}</span>
                        </div>
                    </div>
                )}
        </div>

    );
}