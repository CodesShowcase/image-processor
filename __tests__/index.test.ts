import app from '../src'
import supertest from 'supertest'

const request = supertest(app)

describe('Route Tests', (): void => {

  test('Route | Root => Should return status 200', async (): Promise<void> => {
    const response = await request.get('/')
		expect(response.status).toBe(200)
  })

  test('Route | Get all images => Should return status 200', async (): Promise<void> => {
    const response = await request.get('/api/view')
		expect(response.status).toBe(200)
  })

  test('Route | Retrieve single image => Should return status 200', async (): Promise<void> => {
    const response = await request.get('/api/view?file=fjord');
    expect(response.status).toBe(200);
  });

  test('Route | Retrieve single nonexistent image => Should return status 400', async (): Promise<void> => {
    const response = await request.get('/api/view?file=doesnotexist');
    expect(response.status).toBe(400);
  });

  test('Route | Resize image => Should return status 200', async (): Promise<void> => {
    const response = await request.get('/api/resize?file=fjord&width=400&height=200');
    expect(response.status).toBe(200);
  });

  test('Route | Greyscale image => Should return status 200', async (): Promise<void> => {
    const response = await request.get('/api/greyscale?file=fjord');
    expect(response.status).toBe(200);
  });

})

describe('Controller Tests', (): void => {

  test('Controller | Retrieve a single image', async (): Promise<void> => {
    const response = await request.get(`/api/view?file=fjord`)
		expect(response.files).toBeTrue
  })

  test('Controller | Should return resized image', async (): Promise<void> => {
    const response = await request.get(`/api/resize?file=fjord&width=400&height=200`)
		expect(response.files).toBeTrue
  })

  test('Controller | Resize some parameters are missing Parameters', async (): Promise<void> => {
    const response = await request.get(`/api/resize?width=400&height=200`)
		expect(response.text).toBe('Parameters are missing => /api/resize?file=name&width=pixel&height=pixel')
  })

  test('Controller | Should return greyscaled image', async (): Promise<void> => {
    const response = await request.get(`/api/greyscale?file=fjord`)
		expect(response.files).toBeTrue
  })

})
