const path = require("path");
const fs = require("fs");
const posts = require("../database/db.js");

const index = (req, res) => {
    res.format({
        html: () => {
            let html = '<ul>';

            posts.forEach(({ title, image, content, tags }) => {
                html += `<li>
                    <div>
                        <h2>${title}</h2>
                        <p>${content}</p>
                        <p>${tags.map(tag => `<span>${tag}</span>`).join(' ')}</p>
                        <img width="150" src=${`/imgs/posts/${image}`} />
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
                </div>
                `);
            } else {
                res.status(404).send(`<h1>Post non trovato</h1>`);
            }
        },
        json: () => {
            if (post) {
                res.json({
                    ...post
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

module.exports = {
    index,
    show
}