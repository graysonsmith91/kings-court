export const Pagination = ({ commentsPerPage, totalComments, paginate, currentPage }) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalComments / commentsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <button onClick={() => paginate(number)} className={number == currentPage ? 'pagination-active' : 'page-link'}>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )

}