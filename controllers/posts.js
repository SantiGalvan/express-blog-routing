const path = require("path");
const fs = require("fs");
const posts = require("../database/db.js");

const index = (req, res) => {
    res.format({
        html: () => {
            let html = '<ul>';

            posts.forEach(({ title, image, content, tags, slug }) => {
                html += `<li>
                    <div>
                        <h2>${title}</h2>
                        <p>${content}</p>
                        <p>${tags.map(tag => `<span>${tag}</span>`).join(' ')}</p>
                        <img width="150" src=${`/imgs/posts/${image}`} />
                        <a href=${`http://${req.headers.host}/posts/${slug}`} >Visualizza</a>
                    </div>
                </li>`
            })

            html += '</ul>';
            res.send(html);
        },
        json: () => {
            res.json({
                data: posts,
                count: posts.length
            });
        }
    });
};

const show = (req, res) => {
    const slug = req.params.slug;
    const post = posts.find(post => post.slug === slug);

    res.format({
        html: () => {
            if (post) {
                res.send(`
                <div>
                    <h3>${post.title}</h3>
                    <img width="200" src=${`/imgs/posts/${post.image}`} />
                    <p><strong>Ingredienti</strong>: ${post.tags.map(tag => `<span>${tag}</span>`).join(' ')}</p>
                    <a href=${`http://${req.headers.host}/posts/${post.slug}/download`} >Scarica immagine</a>
                    <a href=${`http://${req.headers.host}/imgs/posts/${post.image}`} >Visualizza immagine</a>
                </div >
    `);
            } else {
                res.status(404).send(`< h1 > Post non trovato</h1 > `);
            }
        },
        json: () => {
            if (post) {
                res.json({
                    ...post,
                    image_url: `http://${req.headers.host}/imgs/posts/${post.image}`,
                    image_download_url: `http://${req.headers.host}/posts/${post.slug}/download`
                });
            } else {
                res.status(404).json({
                    error: 'Not found',
                    description: `Non esiste un post con slug ${slug}`
                });
            }
        }
    })
};

const create = (req, res) => {
    res.format({
        html: () => {
            res.send('<h1>Creazione nuovo post</h1>');
        },
        default: () => {
            res.status(406).send('<h1>Non accessibile</h1>')
        }
    });
};

const download = (req, res) => {
    const slug = req.params.slug;
    const post = posts.find(post => post.slug === slug);

    if (!post) {
        res.status(404).send('File not found.');
        return;
    }
    const filePath = path.join(__dirname, `../public/imgs/posts/${post.image}`);

    if (fs.existsSync(filePath)) res.download(filePath);
};

module.exports = {
    index,
    show,
    create,
    download
}
