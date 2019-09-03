import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import {NgSelectModule, NgOption} from '@ng-select/ng-select';

// SERVICE
import { ProductService } from '../services/product.service';
import { NotificationService } from '../services/notification.service';

// MODEL
import { Product } from '../models/Product';
import { Disease } from '../models/Disease';
import { DistinctSubscriber } from 'rxjs/internal/operators/distinct';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  // public search: string;
  // public products: Array<Product> = [];
  public symptoms: Array<string> = [];
  public selectedSymptoms: Array<string> = [];
  public disease: Disease;
  public diseases: Array<Disease> = [];
  public result: Array<Disease> = [];

  constructor(
    public productServive: ProductService,
    public activateRoute: ActivatedRoute,
    public notificationService: NotificationService
  ) {}

  public ngOnInit(): void {
    // this.search = '';
    this.mountSymptoms();
    this.mountDiseases();
    this.selectedSymptoms = [];
    // this.products = this.activateRoute.snapshot.data.products;
    // this.listOfProducts();
  }
  private hasSymptoms(value: string): boolean {
    for (const symptom of this.selectedSymptoms) {
      if (symptom === value) {
        return true;
      }
    }
    return false;
  }

  private calculateProbability(count: number, qtd: number): number {
    return Math.round(((count * 100) / qtd) * 100) / 100;
  }

  public process(): void {
    this.mountDiseases();
    this.result = [];
    if (this.selectedSymptoms.length === 0) {
      return;
    }
    this.notificationService.initLoading();
    setTimeout(() => {
      let hasSymptom: boolean;
      for (const disease of this.diseases) {
        hasSymptom = false;
        for (const symptom of disease.symptoms) {
          if (this.hasSymptoms(symptom)) {
            disease.countSymptoms += 1;
            hasSymptom = true;
          }
        }
        if (hasSymptom) {
          disease.probability = this.calculateProbability(disease.countSymptoms, disease.symptoms.length);
          this.result.push(disease);
        }
      }
      this.notificationService.setServerIndisponible();
      this.notificationService.stopLoading();
    }, 500);
  }

  private mountDiseases(): void {
    this.diseases = [];
    this.disease = new Disease();
    this.disease.name = 'GRIPE';
    this.disease.description =
    `É uma doença infecciosa provocada por diversos vírus ARN da família 
    Orthomyxoviridae e que afeta aves e mamíferos. Os sintomas mais comuns são calafrios, 
    febre, rinorreia, dores de garganta, dores musculares, dores de cabeça, tosse, fadiga 
    e sensação geral de desconforto. Em crianças pode ainda provocar diarreia e dores abdominais. 
    Embora seja frequentemente confundida com a constipação, a gripe é uma doença mais grave provocada 
    por um tipo de vírus diferente...`;
    this.disease.symptoms = [];
    this.disease.symptoms.push('FEBRE ALTA');
    this.disease.symptoms.push('DOR DE CABEÇA');
    this.disease.symptoms.push('DORES NOS MÚSCULOS');
    this.disease.symptoms.push('DORES NAS ARTICULAÇÕES');
    this.disease.symptoms.push('CALAFRIOS');
    this.disease.symptoms.push('TOSSE');
    this.disease.symptoms.push('FALTA DE APETITE');
    this.disease.symptoms.push('VÔMITO');
    this.disease.symptoms.push('FALTA DE AR');
    this.disease.symptoms.push('DESCONFORTO RESPIRATÓRIO');
    this.disease.symptoms.push('DIARREIA');
    this.disease.countSymptoms = 0;
    this.disease.probability = 0;
    this.diseases.push(this.disease);

    this.disease = new Disease();
    this.disease.name = 'PRESSÃO ALTA';
    this.disease.description =
    `É doença traiçoeira. Quando os sintomas aparecem, a doença está instalada há muito tempo e já 
    comprometeu o funcionamento de vários órgãos. Para se ter uma ideia, no Brasil, 20% da população 
    e metade das pessoas acima dos 65 anos sofrem de hipertensão arterial...`;
    this.disease.symptoms = [];
    this.disease.symptoms.push('DOR DE CABEÇA');
    this.disease.symptoms.push('FALTA DE AR');
    this.disease.symptoms.push('VISÃO BORRADA');
    this.disease.symptoms.push('ZUMBIDO NO OUVIDO');
    this.disease.symptoms.push('TONTURA');
    this.disease.symptoms.push('DORES NO PEITO');
    this.disease.countSymptoms = 0;
    this.disease.probability = 0;
    this.diseases.push(this.disease);

    this.disease = new Disease();
    this.disease.name = 'DIABETES';
    this.disease.description = 
    `É uma doença causada pela produção insuficiente ou má absorção de insulina, hormônio que regula
     a glicose no sangue e garante energia para o organismo...`;
    this.disease.symptoms = [];
    this.disease.symptoms.push('VÔMITO');
    this.disease.symptoms.push('VONTADE FREQUENTE DE URINA');
    this.disease.symptoms.push('FOME EXCESSIVA');
    this.disease.symptoms.push('SEDE EXCESSIVA');
    this.disease.symptoms.push('EMAGRECIMENTO');
    this.disease.symptoms.push('NÁUSEA');
    this.disease.symptoms.push('MUDANÇAS DE HUMOR');
    this.disease.symptoms.push('NERVOSISMO');
    this.disease.symptoms.push('FADIGA');
    this.disease.symptoms.push('FRAQUEZA');
    this.disease.countSymptoms = 0;
    this.disease.probability = 0;
    this.diseases.push(this.disease);

    this.disease = new Disease();
    this.disease.name = 'RINITE';
    this.disease.description =
    `É caracterizada por sintomas nasais como obstrução, coriza, espirros, coceira ou alterações do olfato,
     geralmente durando por mais de uma hora, dois ou mais dias consecutivos...`;
    this.disease.symptoms = [];
    this.disease.symptoms.push('TOSSE');
    this.disease.symptoms.push('IRRITAÇÃO');
    this.disease.symptoms.push('CORIZA');
    this.disease.symptoms.push('ESPIRRO');
    this.disease.symptoms.push('CONGESTÃO NASAL');
    this.disease.symptoms.push('INCHAÇO NOS OLHOS');
    this.disease.symptoms.push('PURIDO NASAL INTENSO');
    this.disease.countSymptoms = 0;
    this.disease.probability = 0;
    this.diseases.push(this.disease);

    this.disease = new Disease();
    this.disease.name = 'ASMA';
    this.disease.description =
    `É uma das doenças respiratórias crônicas mais comuns, juntamente com a rinite alérgica e a doença
     pulmonar obstrutiva crônica. As principais características dessa doença pulmonar são dificuldade 
     de respirar, chiado e aperto no peito, respiração curta e rápida...`;
    this.disease.symptoms = [];
    this.disease.symptoms.push('TOSSE');
    this.disease.symptoms.push('FALTA DE AR');
    this.disease.symptoms.push('DORES NO PEITO');
    this.disease.symptoms.push('ESPIRRO');
    this.disease.symptoms.push('CHIADO NO PEITO');
    this.disease.symptoms.push('COCEIRA NA GARGANTA');
    this.disease.symptoms.push('BOCA SECA');
    this.disease.countSymptoms = 0;
    this.disease.probability = 0;
    this.diseases.push(this.disease);

    this.disease = new Disease();
    this.disease.name = 'BRONQUITE';
    this.disease.description =
    `É uma inflamação dos brônquios, canais que conduzem o ar inalado até os alvéolos pulmonares. 
    Ela se instala quando os minúsculos cílios que revestem o interior dos brônquios param de eliminar 
    o muco presente nas vias respiratórias...`;
    this.disease.symptoms = [];
    this.disease.symptoms.push('FEBRE ALTA');
    this.disease.symptoms.push('TOSSE');
    this.disease.symptoms.push('FALTA DE AR');
    this.disease.symptoms.push('DORES NO PEITO');
    this.disease.symptoms.push('CHIADO NO PEITO');
    this.disease.symptoms.push('CALAFRIOS');
    this.disease.symptoms.push('FADIGA');
    this.disease.countSymptoms = 0;
    this.disease.probability = 0;
    this.diseases.push(this.disease);

    this.disease = new Disease();
    this.disease.name = 'GASTRITE';
    this.disease.description = 
    `É a inflamação, infecção ou erosão do revestimento do estômago. Ela pode durar por pouco tempo, 
    na chamada gastrite aguda, ou pode durar meses e até mesmo anos (gastrite crônica)...`;
    this.disease.symptoms = [];
    this.disease.symptoms.push('INDIGESTÃO');
    this.disease.symptoms.push('QUEIMAÇÃO');
    this.disease.symptoms.push('PERDA DE APETITE');
    this.disease.symptoms.push('DORES ABDOMINAIS');
    this.disease.symptoms.push('FEZES ESCURAS');
    this.disease.symptoms.push('NÁUSEA');
    this.disease.symptoms.push('VÔMITO');
    this.disease.countSymptoms = 0;
    this.disease.probability = 0;
    this.diseases.push(this.disease);

    this.disease = new Disease();
    this.disease.name = 'DENGUE';
    this.disease.description =
    `É uma doença febril grave causada por um arbovírus. Arbovírus são vírus transmitidos por picadas
     de insetos, especialmente os mosquitos. Existem quatro tipos de vírus de dengue (sorotipos 1, 2, 3 e 4)...`;
    this.disease.symptoms = [];
    this.disease.symptoms.push('FALTA DE APETITE');
    this.disease.symptoms.push('FEBRE ALTA');
    this.disease.symptoms.push('DOR DE CABEÇA');
    this.disease.symptoms.push('DORES NOS MÚSCULOS');
    this.disease.countSymptoms = 0;
    this.disease.probability = 0;
    this.diseases.push(this.disease);

    this.disease = new Disease();
    this.disease.name = 'VIROSE';
    this.disease.description =
    `É um quadro clínico que resulta da infecção provocada por algum tipo de vírus. Em teoria, 
    doenças como gripe, dengue e até mesmo a infecção por HIV poderiam ser consideradas viroses já 
    que são provocadas por um vírus...`;
    this.disease.symptoms = [];
    this.disease.symptoms.push('FEBRE ALTA');
    this.disease.symptoms.push('DOR DE CABEÇA');
    this.disease.symptoms.push('DORES NOS MÚSCULOS');
    this.disease.symptoms.push('TOSSE');
    this.disease.symptoms.push('FALTA DE APETITE');
    this.disease.symptoms.push('VÔMITO');
    this.disease.symptoms.push('DIARREIA');
    this.disease.symptoms.push('NÁUSEA');
    this.disease.countSymptoms = 0;
    this.disease.probability = 0;
    this.diseases.push(this.disease);

    this.disease = new Disease();
    this.disease.name = 'INTOX. ALIM.';
    this.disease.description =
    `É o resultado de uma reacção à comida ou à água contaminadas durante o preparo, manipulação ou 
    armazenamento dos alimentos. Os contaminadores mais comuns são as bactérias, especialmente a 
    Campylobacter jejuni, Salmonela e Clostridium...`;
    this.disease.symptoms = [];
    this.disease.symptoms.push('FEBRE ALTA');
    this.disease.symptoms.push('FALTA DE APETITE');
    this.disease.symptoms.push('VÔMITO');
    this.disease.symptoms.push('DIARREIA');
    this.disease.symptoms.push('NÁUSEA');
    this.disease.symptoms.push('FRAQUEZA');
    this.disease.symptoms.push('DORES ABDOMINAIS');
    this.disease.countSymptoms = 0;
    this.disease.probability = 0;
    this.diseases.push(this.disease);
  }

  private mountSymptoms(): void {
    this.symptoms = [];
    this.symptoms.push('FEBRE ALTA');
    this.symptoms.push('DOR DE CABEÇA');
    this.symptoms.push('DORES NOS MÚSCULOS');
    this.symptoms.push('DORES NAS ARTICULAÇÕES');
    this.symptoms.push('CALAFRIOS');
    this.symptoms.push('TOSSE');
    this.symptoms.push('FALTA DE APETITE');
    this.symptoms.push('VÔMITO');
    this.symptoms.push('FALTA DE AR');
    this.symptoms.push('DESCONFORTO RESPIRATÓRIO');
    this.symptoms.push('DIARREIA');
    this.symptoms.push('VISÃO BORRADA');
    this.symptoms.push('ZUMBIDO NO OUVIDO');
    this.symptoms.push('TONTURA');
    this.symptoms.push('DORES NO PEITO');
    this.symptoms.push('VONTADE FREQUENTE DE URINA');
    this.symptoms.push('FOME EXCESSIVA');
    this.symptoms.push('SEDE EXCESSIVA');
    this.symptoms.push('EMAGRECIMENTO');
    this.symptoms.push('NÁUSEA');
    this.symptoms.push('MUDANÇAS DE HUMOR');
    this.symptoms.push('NERVOSISMO');
    this.symptoms.push('FADIGA');
    this.symptoms.push('FRAQUEZA');
    this.symptoms.push('IRRITAÇÃO');
    this.symptoms.push('CORIZA');
    this.symptoms.push('ESPIRRO');
    this.symptoms.push('CONGESTÃO NASAL');
    this.symptoms.push('INCHAÇO NOS OLHOS');
    this.symptoms.push('PURIDO NASAL INTENSO');
    this.symptoms.push('CHAIDO NO PEITO');
    this.symptoms.push('COCEIRA NA GARGANTA');
    this.symptoms.push('BOCA SECA');
    this.symptoms.push('CALAFRIOS');
    this.symptoms.push('FADIGA');
    this.symptoms.push('INDIGESTÃO');
    this.symptoms.push('QUEIMAÇÃO');
    this.symptoms.push('PERDA DE APETITE');
    this.symptoms.push('DORES ABDOMINAIS');
    this.symptoms.push('FEZES ESCURAS');
  }

  /* public async listOfProducts(): Promise<void> {
    try {
      const response: any = await this.productServive.listAllProducts(this.search).toPromise();
      this.products = response.data;
      if (this.products.length !== 0) {
        this.notificationService.notify('Listagem de produtos retornada com sucesso...', 200);
      }
    } catch (err) {
      console.log(err);
    }
  } */

  /* public filter(): void {
    if (this.search.length > 0 && this.search.trim().length === 0) {
      this.products = [];
      return;
    }
    this.notificationService.setServerIndisponible();
    this.listOfProducts();
  } */

  public ngOnDestroy(): void {}

}
