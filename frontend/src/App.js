import React, {Component} from 'react';

class CustomerApp extends Component {
  constructor() {
    super();
    this.state = {
      name: null,
      timestamp: null,
      customers: null,
      customer: null
    };
  }

  async getCustomer(customer){
    this.setState({customer})
  }

  async getCustomers(){
    const userName = document.getElementById("name").value;

    if(!userName || userName === ""){
      alert("Please provide your name");
      return;
    }

    this.setState({
      name:userName,
      timestamp: (new Date()).toDateString(),
      customers: [
        {
          "id": 1,
          "name": "Customer One",
          "employees": 100,
          "size": "Small",
          "contactInfo": {
            "email": "customer@one.com",
            "name": "Greg H."
          }
        },
        {
          "id": 2,
          "name": "Customer Two",
          "employees": 101,
          "size": "Medium",
          "contactInfo": {
            "email": "customer@two.com",
            "name": "Zeff A."
          }
        },
        {
          "id": 3,
          "name": "Customer Three",
          "employees": 1000,
          "size": "Medium",
          "contactInfo": {
            "email": "customer@three.com",
            "name": "Alfred B."
          }
        },
        {
          "id": 4,
          "name": "Customer Four",
          "employees": 1001,
          "size": "Big"
        }
      ]
    });
  }

  render() {
    return (
      <div>
        { !this.state.name &&
          <div>
            <p>Please provide your name:</p>
            <input type="text" id="name" data-testid="name" />
            <input type="button" value="Submit" data-testid="submit-btn" onClick={this.getCustomers.bind(this)}/>
          </div>
        }
        { this.state.name && 
          <div>
            <p>Hi <b>{this.state.name}</b>. It is now <b>{this.state.timestamp}</b> and here is our customer list.</p>
            { !this.state.customer &&
            <div>
              <p>Click on each of them to view their contact details.</p>
              <table border="1">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th># of Employees</th>
                    <th>Size</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.customers.map(customer => 
                    <tr key={customer.id}>
                      <td><a href="#" onClick={() => this.getCustomer(customer)}>{customer.name}</a></td>
                      <td>{customer.employees}</td>
                      <td>{customer.size}</td>
                    </tr>  
                  )}
                </tbody>
              </table>
            </div>
            }
            { this.state.customer &&
              <div>
                <hr></hr>
                <p><b><em>Customer Details</em></b></p>
                <p><b>Name:</b> {this.state.customer.name}</p>
                <p><b># of Employees:</b> {this.state.customer.employees}</p>
                <p><b>Size:</b> {this.state.customer.size}</p>
                { this.state.customer.contactInfo ?
                  <p><b>Contact:</b> {this.state.customer.contactInfo.name} ({this.state.customer.contactInfo.email})</p> :
                  <p>No contact info available</p>
                }
                <input type="button" value="Back to the list" onClick={() => this.setState({customer: null})}/>
              </div>
            }
          </div>
        }
      </div>
    )
  }
}

function App() {
  return (
    <div>
      <h1>Welcome to Customer App</h1>
      <CustomerApp/>
    </div>
  );
}

export default App;
