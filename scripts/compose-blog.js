// scripts/createPost.js
const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question('Enter the title of your new post: ', (title) => {
  const slug = title.toLowerCase().replace(/ /g, '-')
  const date = new Date().toISOString().split('T')[0]
  const template = `---
title: '${title}'
date: '${date}'
tags: ['tag1', 'tag2']
draft: true
summary: ''
---

Enter your post content here.
`

  const blogDir = path.join(__dirname, '../data/blog')
  fs.readdir(blogDir, (err, files) => {
    if (err) throw err

    const sequenceNumbers = files.map((file) => parseInt(file.split('-')[0]))
    const maxSequenceNumber = Math.max(...sequenceNumbers)
    const newSequenceNumber = isNaN(maxSequenceNumber) ? 1 : maxSequenceNumber + 1

    const filename = `${newSequenceNumber.toString().padStart(2, '0')}_${slug}.mdx`

    fs.writeFile(path.join(blogDir, filename), template, (err) => {
      if (err) throw err
      console.log(`Blog post created: ${filename}`)
    })
  })

  rl.close()
})
