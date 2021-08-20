/// <reference types="cypress"/>



describe('API Test ', function(){


    var access_token = '';
    var user_id = '';

    beforeEach('Get the Token',function(){
        cy.request({
            method: 'POST',
            url: 'http://localhost:8080/auth/realms/master/protocol/openid-connect/token',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
              },
            form: true,
            body: {
                'username': 'admin',
                'password': 'admin',
                'grant_type': 'password',
                'client_id': 'admin-cli' 
            }

        }).then(function(response){
            cy.log(JSON.stringify(response));
            cy.log(response.body.access_token);
            access_token = response.body.access_token
        });
    })


    it('Add user API request validation',function(){

        let firstName = 'test_' + Math.random().toString(36).replace(/[^a-z]+/g, '');
        let email = 'test_' + Math.random().toString(36).replace(/[^a-z]+/g, '') + '@test.com';
        let username = 'test_' + Math.random().toString(36).replace(/[^a-z]+/g, '');


            cy.request({
                method: 'post',
                url:'http://localhost:8080/auth/admin/realms/master/users',
                headers: {
                    'Container_Type': 'application/json',
                    'Authorization': 'Bearer ' + access_token

                
                },

                body: {
                    "firstName": firstName,
                    "lastName": "TestLastName1277",
                    "email": email,
                    "enabled": "True",
                    "username": username
                }



            }).then(function(response){

                expect(response.status).to.equal(201)
            });
        })
        
        it('Get All Users API request validation',function(){


            cy.request({
                method: 'get',
                url:'http://localhost:8080/auth/admin/realms/master/users',
                headers: {
                    'Container_Type': 'application/json',
                    'Authorization': 'Bearer ' + access_token

                
                }

            }).then(function(response){
                // cy.log(JSON.stringify(response));
                user_id=JSON.stringify(response.body[0].id).replace(/"/g,'')
                cy.log('user id is :' + user_id)
                expect(response.status).to.equal(200)
            });
        })

        it('Get User with User ID',function(){


            cy.request({
                method: 'get',
                url:`http://localhost:8080/auth/admin/realms/master/users/${user_id}`,
                headers: {
                    'Container_Type': 'application/json',
                    'Authorization': 'Bearer ' + access_token

                
                }

            }).then(function(response){
                cy.log(JSON.stringify(response));
                // user_id=JSON.stringify(response.body[0].id)
                // cy.log('user id is :' + user_id)
                expect(response.status).to.equal(200)
            });
        })

    });


    
// });