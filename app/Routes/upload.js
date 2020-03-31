const Route = use('Route');
const Helpers = use('Helpers');
const Env = use('Env');
/** @type {import('fs')} */
const fs = use('fs');
const sharp = use('sharp');
const sizes = [
  {
    size: [1000],
    name: 'big'
  },
  {
    size: [600],
    name: 'medium'
  },
  {
    size: [300],
    name: 'small'
  },
  {
    size: [300, 300],
    name: 'thumb'
  }
];
// Route.post('upload', async ({ request, response }) => {
//   const profilePics = request.file('file', {
//     types: ['image'],
//     size: '2mb'
//   });
//   await profilePics.move(Helpers.tmpPath('uploads'), {
//     name: `${new Date().getTime()}.${profilePics.subtype}`
//   });

//   if (!profilePics.moved()) {
//     return profilePics.errors();
//   }
//   return `${Env.get('APP_URL')}/api/download/${
//     profilePics.fileName
//   }`.toString();
// });
Route.post('upload', async ({ request, response }) => {
  try {
    await fs.promises.access('./tmp/uploads');
    // The check succeeded
  } catch (error) {
    // The check failed
    try {
      await fs.promises.mkdir('./tmp/uploads', { recursive: true });
    } catch (error) {
      throw new Error('access deny for create updload folder');
    }
  }
  let resize = true;
  request.multipart.file('upload', {}, async file => {
    let name = `./tmp/uploads/${new Date().getTime()}_original.${file.extname}`;
    let writeStrem = fs.WriteStream(name);
    file.stream.pipe(writeStrem).on('finish', file => {
      if (resize) {
        Promise.all(sizes.map(item => _resize(item, name))).then(() => {});
      }
    });
    let url =
      `${Env.get('APP_URL')}/download/` + name.replace('./tmp/uploads/', '');
    response.send({
      fileName: file.clientName,
      uploaded: 1,
      url: url
    });
  });
  request.multipart.file('file', {}, async file => {
    let name = `./tmp/uploads/${new Date().getTime()}_original.${file.extname}`;
    let writeStrem = fs.WriteStream(name);
    file.stream.pipe(writeStrem).on('finish', file => {
      if (resize) {
        Promise.all(sizes.map(item => _resize(item, name))).then(() => {});
      }
    });
    let result =
      `${Env.get('APP_URL')}/download/` + name.replace('./tmp/uploads/', '');
    response.send(result);
  });
  await request.multipart.process();
});

Route.get('download/:fileId', async ({ params, response }) => {
  response.download(Helpers.tmpPath(`uploads/${params.fileId}`));
});

function _resize(item, name) {
  let new_name = name.replace('original', item.name);
  sharp(name)
    .resize(...item.size)
    .toFile(new_name);
}
