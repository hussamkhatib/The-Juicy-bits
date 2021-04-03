import React from 'react'
import Link from "next/link";

const CategoriesPage = ({categories}) => {
    return (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                {
                    categories
                    .map(i => (
                        <Link key={i.title} href={`/categories/${i.title.toLowerCase()}`}>
                            <a className="w-full bg-blue-500 text-white max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
                                {i.title}
                            </a>
                        </Link>

                    )
                    )
                }
            </div>
    )
}

export default CategoriesPage
