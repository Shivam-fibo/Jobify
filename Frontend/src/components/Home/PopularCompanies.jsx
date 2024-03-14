import React from 'react'
import {} from 'react-icons/fa'

const PopularCompanies = () => {

        const companies = [
          {
            id: 1,
            title: "Microsoft",
            location: "Street 10 Mumbai India"
          },
          {
            id: 2,
            title: "Google",
            location: "KolBangla Benguluru"
          },
          {
            id: 3,
            title: "Apple",
            location: "BTM Layout"
          },
          {
            id: 4,
            title: "Sumsumg",
            location: "Zane Steet Kolkata"
          },
        ]

  return (
    <div>
      <div className="companies">
        <div className="container">
          <h3>TOP COMPANIES</h3>
          <div className="banner">
            {
              companies.map(element  =>{
                return(
                  <div className="card" key={element.id}>
                    <div className="content">
                      <div className="icon">{element.icon}</div>
                      <div className="text">
                        <p>{element.title}</p>
                        <p>
                          {element.location}
                        </p>
                      </div>
                    </div>
                    <button>Open Positions {element.openPositions}</button>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopularCompanies
