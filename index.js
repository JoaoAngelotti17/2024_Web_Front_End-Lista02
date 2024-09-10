const express = require('express');
const app = express();
//usando o body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
//simulando um banco de dados
let escola = [
    {
        ra: '1',
        nome: "João",
        disciplinas: [
            { codigo: "MAT101", nome: "Matemática", professor: "Prof. Carlos" },
            { codigo: "HIS101", nome: "História", professor: "Prof. Ana" },
            { codigo: "POR101", nome: "Português", professor: "Prof. João" },
            { codigo: "GEO101", nome: "Geografia", professor: "Prof. Ana" }
        ]
    },
    {
        ra: '2',
        nome: "Maria",
        disciplinas: [
            { codigo: "MAT101", nome: "Matemática", professor: "Prof. Carlos" },
            { codigo: "HIS101", nome: "História", professor: "Prof. Ana" },
            { codigo: "GEO101", nome: "Geografia", professor: "Prof. Ana" }
        ]
    },
    {
        ra: '3',
        nome: "Pedro",
        disciplinas: [
            { codigo: "CIE101", nome: "Ciências", professor: "Prof. João" },
            { codigo: "HIS101", nome: "História", professor: "Prof. Ana" },
            { codigo: "POR101", nome: "Português", professor: "Prof. João" },
            { codigo: "GEO101", nome: "Geografia", professor: "Prof. Ana" },
            { codigo: "EDF101", nome: "Educação Física", professor: "Prof. Carlos" }
        ]
    }
];

// Ex01 - retornando todos os alunos - GET
app.get('/alunos', (req, res) => {
    res.json(escola);
})

// Ex02 - retornando um aluno específico - GET
app.get('/alunos/:ra', (req, res) => {
    let ra = req.params.ra;
    let aluno = escola.find(aluno => aluno.ra == ra);
    if (aluno) {
        res.json(aluno);
    } else {
        res.status(404).send('Aluno não encontrado');
    }
})

// Ex03 - Listar as disciplinas de um aluno pelo ra - GET
app.get('/alunos/:ra/disciplinas', (req, res) => {
    const ra = req.params.ra; 
    const aluno = escola.find(aluno => aluno.ra === ra); 
    
    if (aluno) {
        res.json(aluno.disciplinas); 
    } else {
        res.status(404).send('Aluno não encontrado'); 
    }
});

// Ex04 - Adicionar uma nova disciplina a um aluno específico pelo RA - POST
app.post('/alunos/:ra/disciplinas', (req, res) => {
    const ra = req.params.ra; 
    const aluno = escola.find(aluno => aluno.ra === ra); 

    if (aluno) {
        const novaDisciplina = req.body; 
        aluno.disciplinas.push(novaDisciplina); 
        res.status(201).json({ message: 'Disciplina adicionada com sucesso!', aluno }); 
    } else {
        res.status(404).send('Aluno não encontrado'); 
    }
});


// Ex05 - Atualizar dados dos alunos pelo RA - PUT
app.put('/alunos/:ra', (req, res) => {
    let ra = req.params.ra;
    let aluno = req.body;
    let index = escola.findIndex(aluno => aluno.ra == ra);
    if (index >= 0) {
        escola[index] = aluno;
        res.json(aluno);
    } else {
        res.status(404).send('Aluno não encontrado');
    }
})


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
})