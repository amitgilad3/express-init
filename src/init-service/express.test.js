var should = require('chai').should()
,http = require('http')
,request = require('supertest')


const routes = [{ method: 'get', route: '/custom', middleware: [(req, res) => res.ok() ] }]
var app = require("../init-service")(routes);        

describe("simple-express-service", function(){
    it("GET /_ah/health should return '200'", function(done) {
      request(app)
        .get('/_ah/health')
        .expect(200)
        .expect('X-Powered-By', 'Express')
        .end( function(err, res){
          if (err)
            return done(err) // if response is 500 or 404 & err, test case will fail
          done();
        })
    });
    it("create custom route should return response '200'", function(done) {
        request(app)
          .get('/custom')
          .expect(200)
          .expect('X-Powered-By', 'Express')
          .end( function(err, res){
            if (err)
              return done(err) // if response is 500 or 404 & err, test case will fail
            done();
          })
      });
         it("should return 404 if route dosent exists", function(done) {
        request(app)
          .get('/not-existing')
          .expect(404)
          .expect('X-Powered-By', 'Express')
          .end( function(err, res){
            if (err)
              return done(err) // if response is 500 or 404 & err, test case will fail
            done();
          })
      });
})  