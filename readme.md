Install dependencies :- npm install

Express server run 5000 ( paste in terminal ) :- npm start

POST API :- http://localhost:5000/api/register ( Admin Registration API ) ( Admin Access)
POST API :- http://localhost:5000/api/login ( Admin Login API ) ( Admin Access)
POST API :- http://localhost:5000/api/subs/create ( Admin Create subsubscribers API ) ( Admin Access)
POST API :- http://localhost:5000/api/subs/login ( Subscriber Login API) ( Subscriber Access)
GET API :- http://localhost:5000/api/subs/list ( Public can search subsubscribers API ) ( Both Login Access )
POST API :- http://localhost:5000/api/subs/search?limit=1&page=2 ( Admin Search List limit-pagination ) ( Admin Login Access )
GET API :- http://localhost:5000/api/subs/search?name=jony (Search Records using fileds ) ( Admin Login Access )