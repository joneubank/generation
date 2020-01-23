import React from 'react';

const pageData = require('pages.json');

export default () => (
  <div style={{ textAlign: 'center' }}>
    <h1>Generative Sketches</h1>
    {pageData.map(yearData => (
      <>
        <h2>{yearData.year}</h2>
        {yearData.content.map(monthData => (
          <>
            <h3>{monthData.month}</h3>
            {monthData.content.map(page => (
              <>
                <a href={`/${yearData.year}/${monthData.month}/${page}`}>
                  {page}
                </a>
                <br />
              </>
            ))}
          </>
        ))}
      </>
    ))}
  </div>
);
