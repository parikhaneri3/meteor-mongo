#Meteor with MongoDB

This project depicts an analytical dashboard which has few buttons which generates data.

**Functionalities:**
- A `Generate` data button generates 10k rows of random data in MongoDB.
    - Each row contains 10 fields-`Firstname`, `Lastname`, `Username`, `Email`, `Title`, `Product`, `Company`, `City`, `State`, `Country`, `ActiveIndicator`, `Expireddate`, `EffectiveDate`
    - Rows are considered `ACTIVE` when `ActiveIndicator` is `Y` and `Expirydate` is null.
    - Rows are considered `EXPIRED` when `ActiveIndicator` is `Y` and `Expirydate` is `Currentdate`.
    - Rows are considered `DELETED` when `ActiveIndicator` is `N` and `Expirydate` is `Currentdate`.
- A `Reset` data button deletes all rows.
- A `Delete` data button changes rows from ActiveIndicator `Y` to `N` and Expiry date to `CurrentDate`.
- A `Expire` data button changes all active rows to expired rows where Expiry date is `CurrentDate`.
- A `List` data button displays all the list of records using pagination.
  
**Steps to run the project:**:
- Clone the project using `git clone https://github.com/parikhaneri3/meteor-mongo.git`
- Open Terminal and go to project directory and run `meteor`
- Go to `https://localhost:3000`

**Technologies:**
- Meteor
- MLAB(Remote MongoDB)

[**Deployment URL**](https://capitaldk.parikhaneri3.now.sh/)

**Reference Documents:**
- [Meteor Framework](https://www.meteor.com/)
- [Meteor Tutorials](https://www.meteor.com/tutorials)
- [MLAB - MongoDB Free Hosting](https://mlab.com/)
- [Meteor Free Hosting with ZEIT](https://medium.com/@purplecones/deploying-a-meteor-app-for-free-using-zeit-now-c183329057c9)


