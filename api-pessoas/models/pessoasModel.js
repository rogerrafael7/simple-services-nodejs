const connection = require('./index')

const Pessoas = connection.model('Pessoas', {
  tipoPessoa: {
    type: String,
    enum: ['F', 'J']
  },
  cpf: {
    type: String,
    required: function () {
      return this.tipoPessoa === 'F'
    },
    validate: {
      validator: function (v) {
        return v && /^[\d]{3}\.[\d]{3}\.[\d]{3}-[\d]{2}$/.test(v)
      },
      message: props => `${props.value} não é um CPF válido!`
    }
  },
  cnpj: {
    type: String,
    validate: {
      validator: function (v) {
        return v && /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/.test(v)
      },
      message: props => `${props.value} não é um CNPJ válido!`
    },
    required: function () {
      return this.tipoPessoa === 'J'
    }
  },
  uf: {
    type: String,
    required: true
  },
  cidade: {
    type: String,
    required: true
  },
  cep: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return v && /^\d{2}\.\d{3}-\d{3}$/.test(v)
      },
      message: props => `${props.value} não é um CEP válido!`
    }
  },
  telefone: {
    type: String,
    required: true
  },
  nomeCompleto: {
    type: String,
    required: function () {
      return this.tipoPessoa === 'F'
    }
  },
  dataNascimento: {
    type: Date,
    required: function () {
      return this.tipoPessoa === 'F'
    }
  },
  razaoSocial: {
    type: String,
    required: function () {
      return this.tipoPessoa === 'J'
    }
  }
})
module.exports = Pessoas
