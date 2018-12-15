import quantitiesService from '../quantitiesService';

describe('quantitiesService', () => {

  describe('findQuantitiesSums', () => {
    it('calculate simple sum', () => {
      const quantities = [
        [
          {
            quantity: 0.1,
            unit: 'kg',
          },
        ],
        [
          {
            quantity: 0.2,
            unit: 'kg',
          },
        ],
        [
          {
            quantity: 0.1,
            unit: 'kg',
          },
        ],
      ];

      const result = quantitiesService.findQuantitiesSums(quantities);

      // console.log(result);

      expect(result).toEqual({
        kg: 0.4,
      });
    });

    it('should calculate sum in one unit', () => {
      const quantities = [
        [
          {
            quantity: 0.1,
            unit: 'kg',
          },
        ],
        [
          {
            quantity: 0.2,
            unit: 'kg',
          },
          {
            quantity: 2,
            unit: 'szt',
          },
        ],
        [
          {
            quantity: 0.3,
            unit: 'kg',
          },
        ],
      ];

      const result = quantitiesService.findQuantitiesSums(quantities);

      expect(result).toEqual({
        kg: 0.6,
      });
    });

    it('should calculate sum of two units', () => {
      const quantities = [
        [
          {
            quantity: 0.2,
            unit: 'kg',
          },
        ],
        [
          {
            quantity: 2,
            unit: 'szt',
          },
        ],
        [
          {
            quantity: 0.3,
            unit: 'kg',
          },
        ],
      ];

      const result = quantitiesService.findQuantitiesSums(quantities);

      expect(result).toEqual({
        kg: 0.5,
        szt: 2,
      });
    });

  });
});