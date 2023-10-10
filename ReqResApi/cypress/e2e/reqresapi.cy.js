
describe('API Tests', () => {

    it('List Users', () => {
        cy.request('GET','https://reqres.in/api/users?page=2')
        .then((response) => {

            expect(response.status).to.eq(200);
            expect(response.body.page).to.eq(2);
            expect(response.body.per_page).to.eq(6);
            expect(response.body.total).to.eq(12);
            expect(response.body.total_pages).to.eq(2);
            expect(response.body.data).to.have.length(6);

            const user = response.body.data[0];
            expect(user).to.have.property('id');
            expect(user).to.have.property('email');
            expect(user).to.have.property('first_name');
            expect(user).to.have.property('last_name');
            expect(user).to.have.property('avatar');
        });
    });

    it('Signle User', () => {
        cy.request('GET','https://reqres.in/api/users/2')
        .then((response) => {
            expect(response.status).to.eq(200);

            const user = response.body.data;
            expect(user).to.have.property('id');
            expect(user).to.have.property('email');
            expect(user).to.have.property('first_name');
            expect(user).to.have.property('last_name');
            expect(user).to.have.property('avatar');

            const support = response.body.support;
            expect(support).to.have.property('url');
            expect(support).to.have.property('text');
        });
    });

    it('Signle User not found', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users/23',
            failOnStatusCode: false
        })
        .then((response) => {
            expect(response.status).to.eq(404);
        });
    });


    it('List <resource>', () => {
        cy.request('GET','https://reqres.in/api/unknown')
        .then((response) => {

            expect(response.status).to.eq(200);
            expect(response.body.page).to.eq(1);
            expect(response.body.per_page).to.eq(6);
            expect(response.body.total).to.eq(12);
            expect(response.body.total_pages).to.eq(2);
            expect(response.body.data).to.have.length(6);

            const user = response.body.data[0];
            expect(user).to.have.property('id');
            expect(user).to.have.property('name');
            expect(user).to.have.property('year');
            expect(user).to.have.property('color');
            expect(user).to.have.property('pantone_value');
        });
    });

    it('Single <resource>', () => {
        cy.request('GET','https://reqres.in/api/unknown/2')
        .then((response) => {

            expect(response.status).to.eq(200);

            const user = response.body.data;
            expect(user).to.have.property('id');
            expect(user).to.have.property('name');
            expect(user).to.have.property('year');
            expect(user).to.have.property('color');
            expect(user).to.have.property('pantone_value');

            const support = response.body.support;
            expect(support).to.have.property('url');
            expect(support).to.have.property('text');
        });
    });

    it('Signle <resource> not found', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users/23',
            failOnStatusCode: false
        })
        .then((response) => {
            expect(response.status).to.eq(404);
        });
    });

    it('Create user', ()=>{
        cy.request('POST', 'https://reqres.in/api/users', {
            name: 'Rubaiyat E Mohammad',
            job: 'Web Developer',
        }).then((response)=>{
            expect(response.status).to.eq(201);
        })
    })

    it('Update user', ()=>{
        cy.request('PUT', 'https://reqres.in/api/users/2', {
            name: 'RubaiyatEM',
            job: 'Software Developer',
        }).then((response)=>{
            expect(response.status).to.eq(200);
        })
    })

    it('Patch user', ()=>{
        cy.request('PATCH', 'https://reqres.in/api/users/2', {
            name: 'Rubaiyat E M',
            job: 'Dev Ops',
        }).then((response)=>{
            expect(response.status).to.eq(200);
        })
    })

    it('Delete user', () => {
        cy.request('DELETE', 'https://reqres.in/api/users/2')
        .then((response) => {
            expect(response.status).to.eq(204);
        });
    });

    it('Delayed response', () => {
        cy.request('GET','https://reqres.in/api/users?delay=3')
        .then((response) => {

            expect(response.status).to.eq(200);
            expect(response.body.page).to.eq(1);
            expect(response.body.per_page).to.eq(6);
            expect(response.body.total).to.eq(12);
            expect(response.body.total_pages).to.eq(2);
            expect(response.body.data).to.have.length(6);

            const user = response.body.data[0];
            expect(user).to.have.property('id');
            expect(user).to.have.property('email');
            expect(user).to.have.property('first_name');
            expect(user).to.have.property('last_name');
            expect(user).to.have.property('avatar');
        });
    });
});
