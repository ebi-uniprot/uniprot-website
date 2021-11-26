import { AGRRibbonData } from '../../GORibbonHandler';

// Source: https://api.geneontology.org/api/ontology/ribbon/?subset=goslim_agr&subject=UniProtKB:O15393
// Retrieved: 2021-11-25
// See the ribbon at https://www.alliancegenome.org/gene/HGNC:11876

const goRibbonData: AGRRibbonData = {
  categories: [
    {
      description:
        'A molecular process that can be carried out by the action of a single macromolecular machine, usually via direct physical interactions with other molecular entities. Function in this sense denotes an action, or activity, that a gene product (or a complex) performs. These actions are described from two distinct but related perspectives: (1) biochemical activity, and (2) role as a component in a larger system/process.',
      groups: [
        {
          id: 'GO:0003674',
          label: 'all molecular function',
          description: 'Show all molecular function annotations',
          type: 'All',
        },
        {
          description:
            'Catalysis of a biochemical reaction at physiological temperatures. In biologically catalyzed reactions, the reactants are known as substrates, and the catalysts are naturally occurring macromolecular substances known as enzymes. Enzymes possess specific binding sites for substrates, and are usually composed wholly or largely of protein, but RNA that has catalytic activity (ribozyme) is often also regarded as enzymatic.',
          id: 'GO:0003824',
          label: 'catalytic activity',
          type: 'Term',
        },
        {
          description: 'Binds to and modulates the activity of an enzyme.',
          id: 'GO:0030234',
          label: 'enzyme regulator activity',
          type: 'Term',
        },
        {
          description:
            'Receiving a signal and transmitting it in the cell to initiate a change in cell activity. A signal is a physical entity or change in state that is used to transfer information in order to trigger a response.',
          id: 'GO:0038023',
          label: 'signaling receptor activity',
          type: 'Term',
        },
        {
          description:
            'Binding to one or more specific sites on a receptor molecule, a macromolecule that undergoes combination with a hormone, neurotransmitter, drug or intracellular messenger to initiate a change in cell function.',
          id: 'GO:0005102',
          label: 'signaling receptor binding',
          type: 'Term',
        },
        {
          description:
            'Enables the directed movement of substances (such as macromolecules, small molecules, ions) into, out of or within a cell, or between cells.',
          id: 'GO:0005215',
          label: 'transporter activity',
          type: 'Term',
        },
        {
          description:
            'The action of a molecule that contributes to the structural integrity of a complex or its assembly within or outside a cell.',
          id: 'GO:0005198',
          label: 'structural molecule activity',
          type: 'Term',
        },
        {
          description:
            'Binding to a protein component of a cytoskeleton (actin, microtubule, or intermediate filament cytoskeleton).',
          id: 'GO:0008092',
          label: 'cytoskeletal protein binding',
          type: 'Term',
        },
        {
          description:
            'Any molecular function by which a gene product interacts selectively and non-covalently with DNA (deoxyribonucleic acid).',
          id: 'GO:0003677',
          label: 'DNA binding',
          type: 'Term',
        },
        {
          description: 'Binding to an RNA molecule or a portion thereof.',
          id: 'GO:0003723',
          label: 'RNA binding',
          type: 'Term',
        },
        {
          description:
            'A transcription regulator activity that modulates transcription of gene sets via selective and non-covalent binding to a specific double-stranded genomic DNA sequence (sometimes referred to as a motif) within a cis-regulatory region. Regulatory regions include promoters (proximal and distal) and enhancers. Genes are transcriptional units, and include bacterial operons.',
          id: 'GO:0003700',
          label: 'DNA-binding transcription factor activity',
          type: 'Term',
        },
        {
          description:
            'Binding to a transcription factor, a protein required to initiate or regulate transcription.',
          id: 'GO:0008134',
          label: 'transcription factor binding',
          type: 'Term',
        },
        {
          description:
            'Binding to a small molecule, any low molecular weight, monomeric, non-encoded molecule.',
          id: 'GO:0036094',
          label: 'small molecule binding',
          type: 'Term',
        },
        {
          description: 'Binding to a metal ion.',
          id: 'GO:0046872',
          label: 'metal ion binding',
          type: 'Term',
        },
        {
          description:
            'Binding to a carbohydrate, which includes monosaccharides, oligosaccharides and polysaccharides as well as substances derived from monosaccharides by reduction of the carbonyl group (alditols), by oxidation of one or more hydroxy groups to afford the corresponding aldehydes, ketones, or carboxylic acids, or by replacement of one or more hydroxy group(s) by a hydrogen atom. Cyclitols are generally not regarded as carbohydrates.',
          id: 'GO:0030246',
          label: 'carbohydrate binding',
          type: 'Term',
        },
        {
          description: 'Binding to a carbohydrate derivative.',
          id: 'GO:0097367',
          label: 'carbohydrate derivative binding',
          type: 'Term',
        },
        {
          description: 'Binding to a lipid.',
          id: 'GO:0008289',
          label: 'lipid binding',
          type: 'Term',
        },
        {
          id: 'GO:0003674',
          label: 'other molecular function',
          description:
            'Represent all annotations not mapped to a specific term',
          type: 'Other',
        },
      ],
      id: 'GO:0003674',
      label: 'molecular_function',
    },
    {
      description:
        'A biological process represents a specific objective that the organism is genetically programmed to achieve. Biological processes are often described by their outcome or ending state, e.g., the biological process of cell division results in the creation of two daughter cells (a divided cell) from a single parent cell. A biological process is accomplished by a particular set of molecular functions carried out by specific gene products (or macromolecular complexes), often in a highly regulated manner and in a particular temporal sequence.',
      groups: [
        {
          id: 'GO:0008150',
          label: 'all biological process',
          description: 'Show all biological process annotations',
          type: 'All',
        },
        {
          description:
            'The progression of biochemical and morphological phases and events that occur in a cell during successive cell replication or nuclear replication events. Canonically, the cell cycle comprises the replication and segregation of genetic material followed by the division of the cell, but in endocycles or syncytial cells nuclear replication or nuclear division may not be followed by cell division.',
          id: 'GO:0007049',
          label: 'cell cycle',
          type: 'Term',
        },
        {
          description:
            'A process that results in the assembly, arrangement of constituent parts, or disassembly of a cellular component.',
          id: 'GO:0016043',
          label: 'cellular component organization',
          type: 'Term',
        },
        {
          description:
            'Any process that localizes a substance or cellular component. This may occur via movement, tethering or selective degradation.',
          id: 'GO:0051234',
          label: 'establishment of localization',
          type: 'Term',
        },
        {
          description:
            'The multiplication or reproduction of cells, resulting in the expansion of a cell population.',
          id: 'GO:0008283',
          label: 'cell population proliferation',
          type: 'Term',
        },
        {
          description:
            "The process in which relatively unspecialized cells, e.g. embryonic or regenerative cells, acquire specialized structural and/or functional features that characterize the cells, tissues, or organs of the mature organism or some other relatively stable phase of the organism's life history. Differentiation includes the processes involved in commitment of a cell to a specific fate and its subsequent development to the mature state.",
          id: 'GO:0030154',
          label: 'cell differentiation',
          type: 'Term',
        },
        {
          description:
            'Any biological process that results in permanent cessation of all vital functions of a cell. A cell should be considered dead when any one of the following molecular or morphological criteria is met: (1) the cell has lost the integrity of its plasma membrane; (2) the cell, including its nucleus, has undergone complete fragmentation into discrete bodies (frequently referred to as apoptotic bodies). The cell corpse (or its fragments) may be engulfed by an adjacent cell in vivo, but engulfment of whole cells should not be considered a strict criteria to define cell death as, under some circumstances, live engulfed cells can be released from phagosomes (see PMID:18045538).',
          id: 'GO:0008219',
          label: 'cell death',
          type: 'Term',
        },
        {
          description:
            'A biological process whose specific outcome is the progression of an integrated living unit: an anatomical structure (which may be a subcellular structure, cell, tissue, or organ), or organism over time from an initial condition to a later condition.',
          id: 'GO:0032502',
          label: 'developmental process',
          type: 'Term',
        },
        {
          description:
            'The production of new individuals that contain some portion of genetic material inherited from one or more parent organisms.',
          id: 'GO:0000003',
          label: 'reproduction',
          type: 'Term',
        },
        {
          description:
            'Any process involved in the development or functioning of the immune system, an organismal system for calibrated responses to potential internal or invasive threats.',
          id: 'GO:0002376',
          label: 'immune system process',
          type: 'Term',
        },
        {
          description:
            'A organ system process carried out by any of the organs or tissues of neurological system.',
          id: 'GO:0050877',
          label: 'nervous system process',
          type: 'Term',
        },
        {
          description:
            'Any process that results in a change in state or activity of a cell or an organism (in terms of movement, secretion, enzyme production, gene expression, etc.) as a result of a stimulus. The process begins with detection of the stimulus and ends with a change in state or activity or the cell or organism.',
          id: 'GO:0050896',
          label: 'response to stimulus',
          type: 'Term',
        },
        {
          description:
            'The entirety of a process in which information is transmitted within a biological system. This process begins with an active signal and ends when a cellular response has been triggered.',
          id: 'GO:0023052',
          label: 'signaling',
          type: 'Term',
        },
        {
          description:
            'Any cellular metabolic process involving deoxyribonucleic acid. This is one of the two main types of nucleic acid, consisting of a long, unbranched macromolecule formed from one, or more commonly, two, strands of linked deoxyribonucleotides.',
          id: 'GO:0006259',
          label: 'DNA metabolic process',
          type: 'Term',
        },
        {
          description:
            "The cellular chemical reactions and pathways involving RNA, ribonucleic acid, one of the two main type of nucleic acid, consisting of a long, unbranched macromolecule formed from ribonucleotides joined in 3',5'-phosphodiester linkage.",
          id: 'GO:0016070',
          label: 'RNA metabolic process',
          type: 'Term',
        },
        {
          description:
            'The chemical reactions and pathways involving a protein. Includes protein modification.',
          id: 'GO:0019538',
          label: 'protein metabolic process',
          type: 'Term',
        },
        {
          description:
            'The chemical reactions and pathways involving carbohydrates, any of a group of organic compounds based of the general formula Cx(H2O)y. Includes the formation of carbohydrate derivatives by the addition of a carbohydrate residue to another molecule.',
          id: 'GO:0005975',
          label: 'carbohydrate metabolic process',
          type: 'Term',
        },
        {
          description:
            'The chemical reactions and pathways involving carbohydrate derivative.',
          id: 'GO:1901135',
          label: 'carbohydrate derivative metabolic process',
          type: 'Term',
        },
        {
          description:
            'The chemical reactions and pathways involving lipids, compounds soluble in an organic solvent but not, or sparingly, in an aqueous solvent. Includes fatty acids; neutral fats, other fatty-acid esters, and soaps; long-chain (fatty) alcohols and waxes; sphingoids and other long-chain bases; glycolipids, phospholipids and sphingolipids; and carotenes, polyprenols, sterols, terpenes and other isoprenoids.',
          id: 'GO:0006629',
          label: 'lipid metabolic process',
          type: 'Term',
        },
        {
          description:
            'Any biological process involved in the maintenance of an internal steady state.',
          id: 'GO:0042592',
          label: 'homeostatic process',
          type: 'Term',
        },
        {
          description:
            'The chemical reactions and pathways resulting in the breakdown of substances, including the breakdown of carbon compounds with the liberation of energy for use by the cell or organism.',
          id: 'GO:0009056',
          label: 'catabolic process',
          type: 'Term',
        },
        {
          description:
            'The internally coordinated responses (actions or inactions) of animals (individuals or groups) to internal or external stimuli, via a mechanism that involves nervous system activity.',
          id: 'GO:0007610',
          label: 'behavior',
          type: 'Term',
        },
        {
          id: 'GO:0008150',
          label: 'other biological process',
          description:
            'Represent all annotations not mapped to a specific term',
          type: 'Other',
        },
      ],
      id: 'GO:0008150',
      label: 'biological_process',
    },
    {
      description:
        'A location, relative to cellular compartments and structures, occupied by a macromolecular machine when it carries out a molecular function. There are two ways in which the gene ontology describes locations of gene products: (1) relative to cellular structures (e.g., cytoplasmic side of plasma membrane) or compartments (e.g., mitochondrion), and (2) the stable macromolecular complexes of which they are parts (e.g., the ribosome).',
      groups: [
        {
          id: 'GO:0005575',
          label: 'all cellular component',
          description: 'Show all cellular component annotations',
          type: 'All',
        },
        {
          description:
            'The space external to the outermost structure of a cell. For cells without external protective or external encapsulating structures this refers to space outside of the plasma membrane. This term covers the host cell environment outside an intracellular parasite.',
          id: 'GO:0005576',
          label: 'extracellular region',
          type: 'Term',
        },
        {
          description:
            'The membrane surrounding a cell that separates the cell from its external environment. It consists of a phospholipid bilayer and associated proteins.',
          id: 'GO:0005886',
          label: 'plasma membrane',
          type: 'Term',
        },
        {
          description:
            'The junction between an axon of one neuron and a dendrite of another neuron, a muscle fiber or a glial cell. As the axon approaches the synapse it enlarges into a specialized structure, the presynaptic terminal bouton, which contains mitochondria and synaptic vesicles. At the tip of the terminal bouton is the presynaptic membrane; facing it, and separated from it by a minute cleft (the synaptic cleft) is a specialized area of membrane on the receiving cell, known as the postsynaptic membrane. In response to the arrival of nerve impulses, the presynaptic terminal bouton secretes molecules of neurotransmitters into the synaptic cleft. These diffuse across the cleft and transmit the signal to the postsynaptic membrane.',
          id: 'GO:0045202',
          label: 'synapse',
          type: 'Term',
        },
        {
          description:
            'A cellular component that forms a specialized region of connection between two or more cells, or between a cell and the extracellular matrix, or between two membrane-bound components of a cell, such as flagella.',
          id: 'GO:0030054',
          label: 'cell junction',
          type: 'Term',
        },
        {
          description:
            'A prolongation or process extending from a cell, e.g. a flagellum or axon.',
          id: 'GO:0042995',
          label: 'cell projection',
          type: 'Term',
        },
        {
          description: 'A vesicle found in the cytoplasm of a cell.',
          id: 'GO:0031410',
          label: 'cytoplasmic vesicle',
          type: 'Term',
        },
        {
          description:
            'A vacuole to which materials ingested by endocytosis are delivered.',
          id: 'GO:0005768',
          label: 'endosome',
          type: 'Term',
        },
        {
          description:
            'A closed structure, found only in eukaryotic cells, that is completely surrounded by unit membrane and contains liquid material. Cells contain one or several vacuoles, that may have different functions from each other. Vacuoles have a diverse array of functions. They can act as a storage organelle for nutrients or waste products, as a degradative compartment, as a cost-effective way of increasing cell size, and as a homeostatic regulator controlling both turgor pressure and pH of the cytosol.',
          id: 'GO:0005773',
          label: 'vacuole',
          type: 'Term',
        },
        {
          description:
            'A membrane-bound cytoplasmic organelle of the endomembrane system that further processes the core oligosaccharides (e.g. N-glycans) added to proteins in the endoplasmic reticulum and packages them into membrane-bound vesicles. The Golgi apparatus operates at the intersection of the secretory, lysosomal, and endocytic pathways.',
          id: 'GO:0005794',
          label: 'Golgi apparatus',
          type: 'Term',
        },
        {
          description:
            'The irregular network of unit membranes, visible only by electron microscopy, that occurs in the cytoplasm of many eukaryotic cells. The membranes form a complex meshwork of tubular channels, which are often expanded into slitlike cavities called cisternae. The ER takes two forms, rough (or granular), with ribosomes adhering to the outer surface, and smooth (with no ribosomes attached).',
          id: 'GO:0005783',
          label: 'endoplasmic reticulum',
          type: 'Term',
        },
        {
          description:
            'The part of the cytoplasm that does not contain organelles but which does contain other particulate matter, such as protein complexes.',
          id: 'GO:0005829',
          label: 'cytosol',
          type: 'Term',
        },
        {
          description:
            'A semiautonomous, self replicating organelle that occurs in varying numbers, shapes, and sizes in the cytoplasm of virtually all eukaryotic cells. It is notably the site of tissue respiration.',
          id: 'GO:0005739',
          label: 'mitochondrion',
          type: 'Term',
        },
        {
          description:
            "A membrane-bounded organelle of eukaryotic cells in which chromosomes are housed and replicated. In most cells, the nucleus contains all of the cell's chromosomes except the organellar chromosomes, and is the site of RNA synthesis and processing. In some species, or in specialized cell types, RNA metabolism or DNA replication may be absent.",
          id: 'GO:0005634',
          label: 'nucleus',
          type: 'Term',
        },
        {
          description:
            'A structure composed of a very long molecule of DNA and associated proteins (e.g. histones) that carries hereditary information.',
          id: 'GO:0005694',
          label: 'chromosome',
          type: 'Term',
        },
        {
          description:
            'Any of the various filamentous elements that form the internal framework of cells, and typically remain after treatment of the cells with mild detergent to remove membrane constituents and soluble components of the cytoplasm. The term embraces intermediate filaments, microfilaments, microtubules, the microtrabecular lattice, and other structures characterized by a polymeric filamentous nature and long-range order within the cell. The various elements of the cytoskeleton not only serve in the maintenance of cellular shape but also have roles in other cellular functions, including cellular movement, cell division, endocytosis, and movement of organelles.',
          id: 'GO:0005856',
          label: 'cytoskeleton',
          type: 'Term',
        },
        {
          description:
            'A stable assembly of two or more macromolecules, i.e. proteins, nucleic acids, carbohydrates or lipids, in which at least one component is a protein and the constituent parts function together.',
          id: 'GO:0032991',
          label: 'protein-containing complex',
          type: 'Term',
        },
        {
          id: 'GO:0005575',
          label: 'other cellular component',
          description:
            'Represent all annotations not mapped to a specific term',
          type: 'Other',
        },
      ],
      id: 'GO:0005575',
      label: 'cellular_component',
    },
  ],
  subjects: [
    {
      id: 'UniProtKB:O15393',
      groups: {
        'GO:0003674': {
          ALL: {
            nb_classes: 4,
            nb_annotations: 6,
          },
          TAS: {
            nb_classes: 2,
            nb_annotations: 2,
          },
          IEA: {
            nb_classes: 1,
            nb_annotations: 1,
          },
          IPI: {
            nb_classes: 1,
            nb_annotations: 3,
          },
        },
        'GO:0003824': {
          ALL: {
            nb_classes: 2,
            nb_annotations: 2,
          },
          TAS: {
            nb_classes: 2,
            nb_annotations: 2,
          },
        },
        'GO:0003674-other': {
          ALL: {
            terms: ['GO:0005515', 'GO:0005044'],
            nb_classes: 2,
            nb_annotations: 4,
          },
          IEA: {
            terms: ['GO:0005044'],
            nb_classes: 1,
            nb_annotations: 1,
          },
          IPI: {
            terms: ['GO:0005515'],
            nb_classes: 1,
            nb_annotations: 3,
          },
        },
        'GO:0008150': {
          ALL: {
            nb_classes: 4,
            nb_annotations: 8,
          },
          IDA: {
            nb_classes: 2,
            nb_annotations: 5,
          },
          IEA: {
            nb_classes: 1,
            nb_annotations: 1,
          },
          IMP: {
            nb_classes: 1,
            nb_annotations: 1,
          },
          IBA: {
            nb_classes: 1,
            nb_annotations: 1,
          },
        },
        'GO:0051234': {
          ALL: {
            nb_classes: 1,
            nb_annotations: 1,
          },
          IEA: {
            nb_classes: 1,
            nb_annotations: 1,
          },
        },
        'GO:0019538': {
          ALL: {
            nb_classes: 2,
            nb_annotations: 4,
          },
          IDA: {
            nb_classes: 1,
            nb_annotations: 2,
          },
          IMP: {
            nb_classes: 1,
            nb_annotations: 1,
          },
          IBA: {
            nb_classes: 1,
            nb_annotations: 1,
          },
        },
        'GO:0008150-other': {
          ALL: {
            terms: ['GO:0046598'],
            nb_classes: 1,
            nb_annotations: 3,
          },
          IDA: {
            terms: ['GO:0046598'],
            nb_classes: 1,
            nb_annotations: 3,
          },
        },
        'GO:0005575': {
          ALL: {
            nb_classes: 5,
            nb_annotations: 10,
          },
          TAS: {
            nb_classes: 3,
            nb_annotations: 4,
          },
          IDA: {
            nb_classes: 2,
            nb_annotations: 3,
          },
          HDA: {
            nb_classes: 1,
            nb_annotations: 3,
          },
        },
        'GO:0005576': {
          ALL: {
            nb_classes: 2,
            nb_annotations: 4,
          },
          TAS: {
            nb_classes: 1,
            nb_annotations: 1,
          },
          HDA: {
            nb_classes: 1,
            nb_annotations: 3,
          },
        },
        'GO:0005886': {
          ALL: {
            nb_classes: 2,
            nb_annotations: 5,
          },
          IDA: {
            nb_classes: 1,
            nb_annotations: 2,
          },
          TAS: {
            nb_classes: 2,
            nb_annotations: 3,
          },
        },
        'GO:0005634': {
          ALL: {
            nb_classes: 1,
            nb_annotations: 1,
          },
          IDA: {
            nb_classes: 1,
            nb_annotations: 1,
          },
        },
        'GO:0005575-other': {
          ALL: {
            terms: [],
            nb_classes: 0,
            nb_annotations: 0,
          },
        },
      },
      nb_classes: 13,
      nb_annotations: 24,
      label: 'TMPRSS2',
      taxon_id: 'NCBITaxon:9606',
      taxon_label: 'Homo sapiens',
    },
  ],
};

export default goRibbonData;
