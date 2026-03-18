class Calculadora {
    public somar(x: number, y: number) {
        return x + y;
    }
}

describe("Teste para o serviço de calculadora", () => {
    test("Deveria retornar 2 se somar 1 + 1", () => {
        const calculadora = new Calculadora();
        const resultado = calculadora.somar(1, 1);

        expect(resultado).toBe(7);
    });
});