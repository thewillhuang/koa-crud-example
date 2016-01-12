import { expect } from 'chai';
import supertest from 'supertest';
import app from '../server';
import { v4 as uuid } from 'node-uuid';
import moment from 'moment';
const request = supertest(app.listen());
const db = 'psql';

describe('psql logging api', () => {
  const sessionid = uuid();
  const state = uuid();
  const url = uuid();
  let id;
  it('should insert a row with post', done => {
    request.post(`/${db}/logs`)
      .send({
        sessionid,
        state,
        url,
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.rowCount).to.eql(1);
        expect(res.body.rows).to.be.an('array');
        id = res.body.rows[0].id;
        expect(err).to.be.a('null');
        done();
      });
  });

  it('should get a match with the right sessionid', done => {
    request.get(`/${db}/logs/${sessionid}`)
      .expect(200)
      .query({
        start: moment().subtract(1, 'd').format(),
        end: moment().add(1, 'd').format(),
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.rows).to.have.length(1);
        expect(res.body.rows[0].id).to.eql(id);
        expect(res.body.rows[0].state).to.eql(state);
        expect(res.body.rows[0].url).to.eql(url);
        expect(err).to.be.a('null');
        done();
      });
  });

  const sessionid2 = uuid();
  const state2 = uuid();
  const url2 = uuid();
  it('should update a row given the id', done => {
    request.put(`/${db}/logs/${id}`)
      .send({
        sessionid: sessionid2,
        state: state2,
        url: url2,
      })
      .expect(200)
      .end((err, res) => {
        // console.log(res.body);
        expect(res.body).to.be.an('object');
        expect(res.body.rowCount).to.eql(1);
        expect(err).to.be.a('null');
        done();
      });
  });

  it('should not get a match from a illigal modified sessionid', done => {
    request.get(`/${db}/logs/${sessionid2}`)
      .expect(200)
      .query({
        start: moment().subtract(1, 'd').format(),
        end: moment().add(1, 'd').format(),
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.rows).to.have.length(0);
        expect(err).to.be.a('null');
        done();
      });
  });

  it('should get a match with the right sessionid', done => {
    request.get(`/${db}/logs/${sessionid}`)
      .expect(200)
      .query({
        start: moment().subtract(1, 'd').format(),
        end: moment().add(1, 'd').format(),
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.rows).to.have.length(1);
        expect(res.body.rows[0].id).to.eql(id);
        expect(res.body.rows[0].state).to.eql(state2);
        expect(res.body.rows[0].url).to.eql(url2);
        expect(err).to.be.a('null');
        done();
      });
  });

  it('should delete a row given the id', done => {
    request.del(`/${db}/logs/${id}`)
      .expect(200)
      .end((err, res) => {
        // console.log(res.body);
        expect(res.body).to.be.an('object');
        expect(res.body.rowCount).to.eql(1);
        expect(err).to.be.a('null');
        done();
      });
  });

  it('should not get a match that no longer exists', done => {
    request.get(`/${db}/logs/${sessionid}`)
      .expect(200)
      .query({
        start: moment().subtract(1, 'd').format(),
        end: moment().add(1, 'd').format(),
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.rows).to.have.length(0);
        expect(err).to.be.a('null');
        done();
      });
  });
});
