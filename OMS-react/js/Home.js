import React from 'react'

export default React.createClass({
  render() {
    return ( 
        <div className="evo-home">

            <h1>oms-UI-React</h1>
    		
            <p>oms-UI-React is a set of views (List, Cards, Edit, Browse, and Charts) 
             which adapt to different data structures. Used together these views
              provide a fully customizable Single-Page Application 
              which can behave like a {' '}
              <a href="/todo/list">To-Do app</a>, 
              an <a href="/contact/list">Address Book</a>, 
              a <a href="/comics/cards">Graphic Novels inventory</a>, 
              or anything you may think of. No hand-coding is necessary, changing the model changes the 
              structure of the app.
            </p>

            <p>On the server-side, the REST endpoints can be provided by&nbsp;
                <a href="https://github.com/evoluteur/oms-server-node">oms-Server-Node</a> 
                &nbsp;using Node.js, Express, and Postgres.
            </p> 

            <div className="clearer"/>

            <div className="panel panel-default" style={{padding:'20px',margin:'30px 10px'}}>
                <strong>oms</strong><em> (Biology): </em>
                    The faculty possessed by all substances capable of self-nourishment of 
                    manifesting the nutritive acts by change of form, of volume, or of structure.
            </div>

            <p>oms-UI-React available at <a href="https://github.com/evoluteur/oms-ui-jquery">GitHub</a> under the MIT license.</p>

            <div className="clearfix"></div>

        </div>
    )
  }
})
